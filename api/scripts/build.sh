#!/bin/sh -ex

gcloud builds submit \
  --tag gcr.io/techsylvania-2019-demo/api \
  --project techsylvania-2019-demo
