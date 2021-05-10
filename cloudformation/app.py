#!/usr/bin/env python3
import os
from aws_cdk import core

from static_website.static_website_stack import StaticWebsiteStack

PROJECT_CODE = 'caring-fred'

app = core.App()

account = os.environ.get("AWS_ACCOUNT", os.environ["CDK_DEFAULT_ACCOUNT"])
if not account:
    print('Account not specified via AWS_ACCOUNT or CDK_DEFAULT_ACCOUNT')
    exit()

region = os.environ.get("AWS_REGION", os.environ["CDK_DEFAULT_REGION"])
if not region:
    print('Account not specified via AWS_REGION or CDK_DEFAULT_REGION')
    exit()

stage_name = app.node.try_get_context("stage_name")
domain_name = app.node.try_get_context("domain_name")

stack_name = f"{PROJECT_CODE}-{stage_name}-ui"

StaticWebsiteStack(app, stack_name,
                   description='Stack template for the static front end application',
                   project_code=PROJECT_CODE,
                   stage_name=stage_name,
                   domain_name=domain_name,
                   env=core.Environment(
                        account=account,
                        region=region))

app.synth()
