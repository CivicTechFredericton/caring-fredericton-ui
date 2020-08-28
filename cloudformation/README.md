# Caring Calendar Frontend Deployment

This project is used to create the following AWS resources required to deploy
the static website code:

- S3 bucket
- CoudFront distribution
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
- Node LTS 12.x (for working with serverless)
    - nvm (Node Version Manager) is highly recommended
```

Install the AWS CDK

```
npm install -g aws-cdk
```

### Python Dependencies

Ensure the prerequisites are installed

```
- AWS CDK (npm install -g aws-cdk)
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
cdk synth
```

Run the script to create the environment

```
export AWS_PROFILE=test
export AWS_ACCOUNT=123456789
export AWS_REGION=ca-central-1
./deploy-env.sh <stage_name>
```

** NOTES: **

- Replace **test** with your assume role profile name
- Replace **123456789** with the AWS account ID
- Please include your name for the stage name if you want to create custom AWS
  stack for testing purposes

### Remove Existing Stack

Run the script to destroy the environment

```
export AWS_PROFILE=test
export AWS_ACCOUNT=123456789
export AWS_REGION=ca-central-1
./remove-env.sh <stage_name>
```

** NOTES: **

- Replace **test** with your assume role profile name
- Replace **123456789** with the AWS account ID
- Please include your name for the stage name if you want to create custom AWS
  stack for testing purposes

### Useful commands

- `cdk ls` list all stacks in the app
- `cdk synth` emits the synthesized CloudFormation template
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk docs` open CDK documentation
