#!/bin/sh -ex

gcloud beta run deploy api \
  --image gcr.io/techsylvania-2019-demo/api \
  --region us-central1 \
  --allow-unauthenticated \
  --project techsylvania-2019-demo
