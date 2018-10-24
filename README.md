# Civic Tech - Caring Calendar API #

This project contains the React code used to display the Caring Calendar web site.

## Getting Started

### Clean Up Instructions ###

* Remove the "examples" from this project as needed; this includes:
    * `src/examples`
    * `stories/examples`
    * `translations/en/examples.json`
* Update app routes in `src/app/index.jsx`
    * If upload example was removed, delete the `/upload` route (line 23)
    * If dashboard example was removed, delete the corresponding route (line 25) or replace with the new root component after login. If changed, `onLoginSuccess()` should also be updated in `src/auth/login/sagas.js`.
* Update the metadata files; which include:
    * `package.json` - lines 2 and 4
    * `favicon.ico`
    * `webpack-config/common.js` line 70

### Prerequisites
- Ensure you have a version of NodeJS and NPM which is compatible
with the project (check the engines section of the project)
- Ensure you are running the following commands from the project root

### Common Tasks

#### First Time Setup
1. `npm install`

#### Story Booking
`npm run storybook`

#### Local Development
- `npm run start`: This uses the configs/local.json file

#### Bundling for Deployment
- `npm run build:dev`: This uses the configs/dev.json file
- `npm run build:stage`: This uses the configs/stage.json file
- `npm run build:prod`: This uses the configs/prod.json file

#### Unit Testing
- `npm run test`: Runs your tests once
- `npm run test:watch`: Runs your tests and starts the test watcher; allowing
repeated execution
- `npm run test:coverage`: Runs your tests and outputs coverage information for
your project

### Deployment Instructions

Install aws-runas and sceptre if you haven't already done so:
```
sudo gem install aws_runas
sudo pip install sceptre
```

Create infrastructure:
```
(cd cloudformation/config && ln -s base eric)
aws-runas -r <profile name>
sceptre launch-env eric
```
> Replace 'eric' with your environment name and replace your profile name

Deploy code:
```
# Don't need to run aws-runas again if still in the same shell
aws-runas -r <profile name>
aws s3 sync --delete build/ s3://<bucket name>/
aws cloudfront create-invalidation --distribution-id <ID of your distribution> --paths '/*'
```
> The bucket name can be derived by examining the S3 bucket resource in cloudformation/templates/cloudfront.j2

> The distribution ID can be obtained by visiting the CloudFront console and finding the distribution that matches your environment
