#!/usr/bin/env bash

function install {
  npm ci --loglevel=error --no-audit "$@"
}

function server {
  FEATURE_JIRA_1000=1 npm run start
}

function build {
  npx serverless package
}

function format {
  npx prettier --write .
}

function linter {
  ./node_modules/.bin/ts-standard
}

function test {
  format && linter
}

${@:-echo "enter a command"}
