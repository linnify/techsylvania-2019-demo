#!/bin/sh -ex

gcloud functions deploy check-aggregate-job \
  --region us-central1 \
  --entry-point checkAggregateJob \
  --runtime nodejs8 \
  --trigger-http  \
  --project techsylvania-2019-demo
