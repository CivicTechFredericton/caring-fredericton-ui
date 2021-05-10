@findstr /B /V @ %~dpnx0 > %~dpn0.ps1 && powershell -ExecutionPolicy Bypass %~dpn0.ps1 %*
@exit /B %ERRORLEVEL%

if (-Not $env:AWS_PROFILE) {
  [console]::error.writeline("Please set the environment variable AWS_PROFILE before running this script")
  exit 1
}

if (-Not $args[0]) {
  [console]::error.writeline("Please supply an environment stage name")
  exit 1
}

env=$1

npx cdk destroy -c stage_name=$env
exit $lastExitCode
