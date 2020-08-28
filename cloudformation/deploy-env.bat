@findstr /B /V @ %~dpnx0 > %~dpn0.ps1 && powershell -ExecutionPolicy Bypass %~dpn0.ps1 %*
@exit /B %ERRORLEVEL%

if (-Not $env:AWS_ACCOUNT) {
  [console]::error.writeline("Please set the environment variable AWS_ACCOUNT before running this script")
  exit 1
}

if (-Not G$env:AWS_REGION) {
  [console]::error.writeline("Please set the environment variable AWS_REGION before running this script")
  exit 1
}

if (-Not $args[0]) {
  [console]::error.writeline("Please supply an environment stage name")
  exit 1
}

env=$1

npx cdk deploy -c stage_name=$env
exit $lastExitCode
