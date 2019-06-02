import { Request, Response } from 'express';
import { BigQuery, Job } from '@google-cloud/bigquery';
import { CheckAggregateJobRequest } from '../types/check-aggregate-job-request.interface';
import { Metadata } from '@google-cloud/common';
import {
  checkAggregateJobUrl,
  createCloudTask,
  updateFinalDataUrl
} from './utils';
import { omit } from 'lodash';

const bigQueryClient: BigQuery = new BigQuery();

export const checkAggregateJob = (req: Request, res: Response) => {
  const data: CheckAggregateJobRequest = {
    jobId: req.query.jobId,
    sourceTableId: req.query.table,
    sourceDatasetId: req.query.dataset
  };

  console.log(data);
  bigQueryClient
    .job(data.jobId)
    .getMetadata()
    .then(async (value: [any, any]) => {
      console.log(value[0]);
      if (value[0] && value[0].status && value[0].status.state === 'DONE') {
        await createCloudTask(
          'update-final-data',
          `${updateFinalDataUrl}?dataset=${data.sourceDatasetId}&table=${
            data.sourceTableId
          }`,
          omit(data, ['jobId'])
        );
        res.send('Aggregate job finished, started update final data!');
      } else if (value[0].errors) {
        res.status(202);
      } else {
        await createCloudTask(
          'check-aggregate-job',
          `${checkAggregateJobUrl}?dataset=${data.sourceDatasetId}&table=${
            data.sourceTableId
          }&jobId=${data.jobId}`,
          data,
          5
        );
        res.send('Aggregate job still in progress!');
      }
    });
};
