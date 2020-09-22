#!/bin/bash
set -e
cd $(dirname $0)

if [ -z $AWS_ACCOUNT ] ; then
  echo 'Please set the environment variable AWS_ACCOUNT before running this script'
  exit 1
fi

if [ -z $AWS_REGION ] ; then
  echo 'Please set the environment variable AWS_REGION before running this script'
  exit 1
fi

if [ -z "$1" ]
  then
    echo 'Please supply an environment stage name'
    exit 1
fi

env=$1

npx cdk destroy -c stage_name=$env
