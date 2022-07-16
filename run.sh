#!/usr/bin/env bash

function install {
  npm ci --loglevel=error --no-audit "$@"
}

function server {
  FEATURE_JIRA_1000=1 npm run start
}

function build {
  npm run build
}

${@:-echo "enter a command"}
