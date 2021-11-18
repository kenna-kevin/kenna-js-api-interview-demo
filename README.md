# kenna-js-api-interview-demo
A sample js project for testing the Kenna API

## Install dependencies

Uses yarn to install dependencies

`yarn install`

## Set up .env file

This project uses `dotenv` to import environment variables. There are a few you must set before tests can be run. You can set these in a .env file in the project root.

```
API_BASEURL=https://yourcustomapi.kennasecurity.com
X_RISK_TOKEN=YourXRiskToken
```

NODE_TLS_REJECT_UNAUTHORIZED=0 can be set if you are testing in development to bypass certificate validation

## Run tests

The `yarn test` command will run `mocha`. Specify your spec with `yarn test specs/mySpec.js`