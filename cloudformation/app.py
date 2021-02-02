#!/usr/bin/env python3
import os
from aws_cdk import core

from static_website.static_website_stack import StaticWebsiteStack


# Set the values to be used in the stack
PROJECT_CODE = 'caring-fred-ui'

app = core.App()
stage_name = app.node.try_get_context("stage_name")
stack_name = f"{PROJECT_CODE}-{stage_name}"

StaticWebsiteStack(app, stack_name,
    project_code=PROJECT_CODE,
    stage_name=stage_name,
    env=core.Environment(
        account=os.environ["AWS_ACCOUNT"],
        region=os.environ["AWS_REGION"])
)

app.synth()
