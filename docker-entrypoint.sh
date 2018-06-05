#!/bin/sh
printf "Starting Docker container in $NODE_ENV...\n"
printf "Waiting for MySQL DB to come up...\n";
until node ./provisioning/wait-for-mysql.js
do
  sleep 1;
done
if [ -n "$DB_MIGRATE" ]; then
  printf "\n* Running Database Migrations *\n"
  npm migrate;
fi
if [ -n "$DB_SEED" ]; then
  printf "\n* Seeding Database *\n"
  npm seed;
fi
printf "\n* Starting Application *\n\n"
npm run $NODE_ENV;