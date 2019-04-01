### This an ejected create react app project.

Recent changes

The project works using yarn or npm. To use yarn remove the package-lock.json
file and yarn install to create lock file. Recently upgraded to React 16.8. Node
version 11.8.0 Npm version 6.5.0

Secure routes have been added to help developers there is a way to turn off the
routes. In src/api/cognito/index there is a function isValidSession. Inside the
function set dev to true this will shut of the secure routing so developers can
write and test the pages without using a password.

List of routes

'/login' '/changePassword' '/forgotPassword' '/resetPassword' '/registration'
'/validation' '/'

### `npm start`

Runs the app in the development mode.<br> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br> You will also see any lint errors in
the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br> See the section
about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### Deployment Instructions

Install sceptre and the AWS cli if you haven't already done so:

```
pip install sceptre --upgrade --user
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
