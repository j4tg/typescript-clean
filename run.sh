#!/usr/bin/env bash

function install {
  npm ci --loglevel=error --no-audit "$@"
}

function server {
  lint && \
  FEATURE_JIRA_1000=1 npm run start
}

function format {
  npx prettier --write .
}

function lint {
  # Para intentar arreglar use el comando:
  # ./run.sh lint --fix

  npx eslint . --ext .js,.ts "$@"
}

function test {
  lint
}

${@:-echo "enter a command"}
