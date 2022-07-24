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

function lint {
  # Para arreglar usar el siguiente comando:
  # ./run.sh lint --fix

  npx eslint . --ext .js,.ts "$@"
}

function test {
  lint
}

${@:-echo "enter a command"}
