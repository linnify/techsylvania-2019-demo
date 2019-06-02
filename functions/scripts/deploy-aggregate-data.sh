#!/bin/sh -ex

gcloud functions deploy aggregate-data \
  --region us-central1 \
  --entry-point aggregateData \
  --runtime nodejs8 \
  --trigger-http  \
  --project techsylvania-2019-demo
