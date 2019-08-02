# Civic Tech - Caring Calendar

This project contains the responsive web application for the Caring Calendar
application. The project uses the React framework as the basis for the
application.

## Functionality:

- User Registration
- Organization Management (Registration, Verification, Updates)
- Scheduling Events

## Project Setup

NPM is used to install the required React dependencies

### NPM Dependencies

Ensure the prerequisites are installed

```
- OPTIONAL: Node Virtual Manager (nvm)
- Node 8.15.x
```

Install the NPM dependencies

```
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `npm run build:<env>`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the
best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### Deployment Instructions

Install sceptre and the AWS cli if you haven't already done so:

```
pip install sceptre==1.4.2 --upgrade --user
pip install awscli --upgrade --user
```

Create infrastructure:

```
(cd cloudformation/config && ln -s base <env>)
export AWS_PROFILE=<profile name>
sceptre launch-env <env>
```

> Replace '<env>' with your environment name and replace your profile name

Deploy code:

```
export AWS_PROFILE=<profile name>
aws s3 sync --delete build/ s3://<bucket name>/
aws cloudfront create-invalidation --distribution-id <ID of your distribution> --paths '/*'
```
