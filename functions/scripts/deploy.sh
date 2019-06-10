#!/bin/sh -ex

./scripts/deploy-upload-to-bigquery.sh &
./scripts/deploy-aggregate-data.sh &
./scripts/deploy-check-aggregate-job.sh &
./scripts/deploy-update-final-data.sh &

wait
