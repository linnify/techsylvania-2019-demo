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
  if (req.method !== 'POST') {
    res.status(202);
  }

  const data: CheckAggregateJobRequest = req.body;

  bigQueryClient
    .job(data.jobId)
    .poll_(
      async (err: Error | null, metadata?: Metadata, apiResponse?: any) => {
        if (metadata && metadata.status && metadata.status.state === 'DONE') {
          await createCloudTask(
            'update-final-data',
            updateFinalDataUrl,
            omit(data, ['jobId'])
          );
          res.send('Aggregate job finished, started update final data!');
        }
        if (err) {
          res.status(202);
        }
        await createCloudTask(
          'check-aggregate-job',
          checkAggregateJobUrl,
          data,
          5
        );
        res.send('Aggregate job still in progress!');
      }
    );
};
