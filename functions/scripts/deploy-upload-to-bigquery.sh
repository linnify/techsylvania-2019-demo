#!/bin/sh -ex

gcloud functions deploy upload-to-bigquery \
  --region us-central1 \
  --entry-point uploadToBigQuery \
  --runtime nodejs8 \
  --trigger-resource techsylvania_travel_data  \
  --trigger-event google.storage.object.finalize \
  --memory 2048MB \
  --timeout 540 \
  --project techsylvania-2019-demo
