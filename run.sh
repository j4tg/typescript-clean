#!/usr/bin/env bash

function install {
  npm ci --loglevel=error --no-audit "$@"
}

function server {
  npm run start
}

${@:-echo "unrecognized task"}
