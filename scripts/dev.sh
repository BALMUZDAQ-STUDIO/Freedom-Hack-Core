#!/bin/bash

env_file="./config/.env"

env -S "$(grep -v '^#' $env_file | xargs)" node index.js