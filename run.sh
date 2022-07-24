#!/usr/bin/env bash

function install {
  npm ci --loglevel=error --no-audit "$@"
}

function server {
  format &&
    lint &&
    FEATURE_JIRA_1000=1 npx serverless offline start
}

function test {
  # command to enable watch mode: ./run.sh test --watch
  # command to run a single file: ./run.sh test <path>/<file>.ts

  args="$@"
  [[ -z $args ]] && args="--coverage"

  format &&
    lint &&
    npx jest $args
}

function format {
  npx prettier --write .
}

function lint {
  # command to try fix: ./run.sh lint --fix

  npx eslint . --ext .js,.ts "$@"
}

${@:-echo "enter a command"}
