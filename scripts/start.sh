#!/bin/bash

echo "Enter AI API token: "
read ai_token

echo "Enter HH.kz API token: "
read hh_token

echo "Enter Auth secret token: "
read secret_token

echo "Enter MySQL Login token: "
read db_login
echo "Enter MySQL Password token: "
read db_password

AI_TOKEN=$ai_token HH_TOKEN=$hh_token AUTH_SECRET=$auth_secret DB_LOGIN=$db_login DB_PASSWORD=$db_password node index.js

clear 