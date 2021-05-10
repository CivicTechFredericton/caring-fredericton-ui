# Caring Calendar Frontend Deployment

This project is used to create the following AWS resources required to deploy
the static website code:

- S3 bucket
- CloudFront distribution
- Route 53 A record

## SSM Parameter Store Configuration (Prior to deployment)

The SSM Parameter Store service will be leveraged to store environment and
account specific configuration details. These values are set manually via AWS
console; if you want to change defaults then set the value in ssm and redeploy.

| Key                  | Description                                                            | Default |
| :------------------- | :--------------------------------------------------------------------- | :------ |
| base-certificate-arn | REQUIRED! The default ARN for the us-east-1 SSL certificate being used | None    |

** NOTE: **

- This ARN value must be the one for the us-east-1 region or the CloudFront step
  will fail.

### Project Structure

- The `cdk.json` file tells the CDK Toolkit how to execute your app
- The `setup.py` file defines the modules required to deploy the resources
- The `app.py` file runs the commands required to deploy the stack

NOTE:

- To add additional dependencies (i.e. - other CDK libraries) simply add them to
  your `setup.py` file and rerun the `pip install -r requirements.txt` command

### NPM Dependencies

Ensure the prerequisites are installed

```
- Node LTS 14.x (for working with the CDK)
    - nvm (Node Version Manager) is highly recommended
```

### Python Dependencies

Ensure the prerequisites are installed

```
- Python3.8
- pip (tool for installing Python packages)
```

Create virtual env for python3.8 inside project directory:

```
python3.8 -m venv venv
```

Activate newly created environment

```
. venv/bin/activate (Linux / OSX)
.env\Scripts\activate.bat (Windows)
```

Install the required python packages

```
pip install -r requirements.txt
```

### Deploy New Stack

Synthesize the CloudFormation template

```
npx cdk synth -c stage_name=test -c domain_name=test
```

** NOTES: **

- Replace **test** with your assume role profile name

Run the script to create the environment

```
export AWS_PROFILE=<profile_name>
export AWS_ACCOUNT=<account_id>
export AWS_REGION=<region_name>
./deploy-env.sh <stage_name> <domain_name>
```

** NOTE: **
- Replace values with your account details

### Remove Existing Stack ###

Run the script to destroy the environment

```
export AWS_PROFILE=<profile_name>
export AWS_ACCOUNT=<account_id>
export AWS_REGION=<region_name>
./remove-env.sh <stage_name> <domain_name>
```

** NOTE: **
- Replace values with your account details

### Useful commands ###

- `npx cdk ls` list all stacks in the app
- `npx cdk synth` emits the synthesized CloudFormation template
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk docs` open CDK documentation
