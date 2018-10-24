from sceptre.resolvers import Resolver


class ACMResolver(Resolver):

    def __init__(self, *args, **kwargs):
        super(ACMResolver, self).__init__(*args, **kwargs)

    def resolve(self):
        """
        resolve is the method called by Sceptre. It should carry out the work
        intended by this resolver. It should return a string to become the
        final value.

        self.argument is available from the base class and contains the
        argument defined in the sceptre config file (see below)

        The following attributes may be available from the base class:
        self.stack_config  (A dict of data from <stack_name>.yaml)
        self.environment_config  (A dict of data from config.yaml)
        self.connection_manager (A connection_manager)
        """
        acm_client = self.connection_manager.boto_session.client('acm')

        domain_name = self.argument
        wildcard_domain = '*.%s' % domain_name.partition('.')[2]
        matches = []

        certificates = acm_client.list_certificates()['CertificateSummaryList']

        for cert in certificates:
            cert_details = acm_client.describe_certificate(
                CertificateArn=cert['CertificateArn']
            )['Certificate']

            if cert_details['Status'] != 'ISSUED':
                continue

            sub_alt_names = cert_details['SubjectAlternativeNames']

            if domain_name in sub_alt_names \
                    or wildcard_domain in sub_alt_names:
                matches.append(cert_details)

        highest_date = None

        for match in matches:
            if highest_date is None or match['NotAfter'] > highest_date:
                highest_date = match['NotAfter']
                best_match = match

        try:
            return best_match['CertificateArn']
        except:
            raise Exception('Unable to find certificate for given domain_name '
                            'value: %s' % domain_name)
