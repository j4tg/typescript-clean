#!/usr/bin/env bash

WC='\033[1;37m' # White Color
NC='\033[0m'    # No Color

function install {
  npm ci --loglevel=error --no-audit "$@"
}

function server {
  local args="$@"
  [[ -z $args ]] && args="--stage local"

  prettier &&
    eslint &&
    DEBUG=@:* npx serverless offline start $args
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
  # to try fix: ./run.sh prettier --write .

  local args="$@"
  [[ -z $args ]] && args="--check ."

  npx prettier $args || {
    echo -e "\ntry to fix: ${WC}./run.sh prettier --write .${NC}"
    exit $1
  }
}

function eslint {
  # to try fix: ./run.sh eslint --fix

  local args="$@"
  [[ -z $args ]] && args="--max-warnings 0"

  npx eslint --ext .js,.ts $args . || {
    echo -e "\ntry to fix: ${WC}./run.sh eslint --fix${NC}"
    exit $1
  }
}

${@:-echo "enter a command"}
