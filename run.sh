#!/usr/bin/env bash

function install {
  npm ci --loglevel=error --no-audit "$@"
}

function server {
  local args="$@"
  [[ -z $args ]] && args="--stage local"

  prettier &&
    eslint &&
    FEATURE_JIRA_1000=1 npx serverless offline start $args
}

function test {
  # enable watch mode: ./run.sh test --watch
  # run a single file: ./run.sh test <path>/<file>.ts

  local args="$@"
  [[ -z $args ]] && args="--coverage"

  prettier &&
    eslint &&
    npx jest $args
}

function prettier {
  # try to fix: ./run.sh prettier --write .

  local args="$@"
  [[ -z $args ]] && args="--check ."

  npx prettier $args || {
    echo -e "\ntry to fix: ./run.sh prettier --write ."
    exit $1
  }
}

function eslint {
  # try to fix: ./run.sh eslint --fix

  npx eslint . --ext .js,.ts "$@"
}

${@:-echo "enter a command"}
