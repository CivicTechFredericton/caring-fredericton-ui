from aws_cdk import aws_cloudfront, aws_route53, aws_route53_targets, aws_s3, aws_ssm

from aws_cdk.core import Construct, CfnOutput, Duration, RemovalPolicy, Stack
from aws_cdk.aws_certificatemanager import Certificate
from aws_cdk.aws_cloudfront import CloudFrontWebDistribution, LoggingConfiguration, SourceConfiguration, \
    ViewerCertificate
from aws_cdk.aws_iam import PolicyStatement, CanonicalUserPrincipal
from aws_cdk.aws_route53 import HostedZone
from aws_cdk.aws_s3 import BucketAccessControl

WEBSITE_INDEX_FILE = 'index.html'
CERT_ARN_SSM_KEY_NAME = 'base-certificate-arn'


class StaticWebsiteStack(Stack):

    def __init__(self, scope: Construct, id: str, project_code: str, stage_name: str,
                 domain_name: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        cloud_front_comment = f"{project_code}-{stage_name}-frontend"

        # Create Origin Access Identity to be use Canonical User Id in S3 bucket policy
        origin_access_identity = aws_cloudfront.OriginAccessIdentity(
            self, "DefaultOrigin",
            comment=cloud_front_comment
        )

        # Create the S3 bucket for the static files
        bucket_name = f"{project_code}-{stage_name}-frontend"
        site_bucket = aws_s3.Bucket(self, "WebsiteBucket",
                                    bucket_name=bucket_name,
                                    access_control=BucketAccessControl.PRIVATE,
                                    website_index_document=WEBSITE_INDEX_FILE,
                                    removal_policy=RemovalPolicy.DESTROY)

        # Allow access from CloudFront
        site_bucket.add_to_resource_policy(PolicyStatement(
            actions=["s3:GetObject"],
            resources=[site_bucket.arn_for_objects("*")],
            principals=[CanonicalUserPrincipal(
                origin_access_identity.cloud_front_origin_access_identity_s3_canonical_user_id)]
        ))

        CfnOutput(self, "BucketArn", value=site_bucket.bucket_arn)
        CfnOutput(self, "BucketName", value=site_bucket.bucket_name)

        # Create the S3 for logging
        logging_bucket = aws_s3.Bucket(self, "LoggingBucket",
                                       bucket_name=f"{bucket_name}-logging",
                                       access_control=BucketAccessControl.PRIVATE,
                                       versioned=True,
                                       removal_policy=RemovalPolicy.DESTROY)

        # Lookup the certificate ARN - This must be the one in the us-east-1 region
        cert_arn = aws_ssm.StringParameter.value_for_string_parameter(
            self, CERT_ARN_SSM_KEY_NAME)

        certificate = Certificate.from_certificate_arn(self, 'CertificateLookup', cert_arn)

        # Create the CloudFront distribution
        site_name = f"{stage_name}-www.{domain_name}"
        distribution = CloudFrontWebDistribution(self, "WebsiteDistribution",
                                                 default_root_object=WEBSITE_INDEX_FILE,
                                                 comment=cloud_front_comment,
                                                 viewer_certificate=ViewerCertificate.from_acm_certificate(
                                                     certificate=certificate,
                                                     aliases=[site_name],
                                                     ssl_method=aws_cloudfront.SSLMethod.SNI,
                                                     security_policy=aws_cloudfront.SecurityPolicyProtocol.TLS_V1_2_2019,
                                                 ),
                                                 logging_config=LoggingConfiguration(
                                                    bucket=logging_bucket
                                                 ),
                                                 price_class=aws_cloudfront.PriceClass.PRICE_CLASS_100,
                                                 error_configurations=[
                                                     aws_cloudfront.CfnDistribution.CustomErrorResponseProperty(
                                                         error_code=403,
                                                         response_code=200,
                                                         response_page_path=f"/{WEBSITE_INDEX_FILE}",
                                                         error_caching_min_ttl=300)
                                                 ],
                                                 origin_configs=[SourceConfiguration(
                                                    s3_origin_source=aws_cloudfront.S3OriginConfig(
                                                        s3_bucket_source=site_bucket,
                                                        origin_access_identity=origin_access_identity),
                                                    behaviors=[aws_cloudfront.Behavior(
                                                        is_default_behavior=True,
                                                        default_ttl=Duration.hours(1))
                                                    ])
                                                 ])

        # Set the output values
        CfnOutput(self, "DistributionId", value=distribution.distribution_id)
        CfnOutput(self, "SiteName", value=f"https://{site_name}")

        # Update Route 53 alias record for the CloudFront distribution
        hosted_zone = HostedZone.from_lookup(self, "HostedZone",
                                             domain_name=domain_name,
                                             private_zone=False)

        aws_route53.ARecord(self, "SiteAliasRecord",
                            zone=hosted_zone,
                            target=aws_route53.RecordTarget.from_alias(
                                aws_route53_targets.CloudFrontTarget(distribution)),
                            record_name=site_name)
