#!/bin/sh -ex

gcloud functions deploy update-final-data \
  --region us-central1 \
  --entry-point updateFinalData \
  --runtime nodejs8 \
  --trigger-http  \
  --project techsylvania-2019-demo
