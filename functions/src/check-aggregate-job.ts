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

/**
 * Function used to check the current status of a job.
 */
export const checkAggregateJob = (req: Request, res: Response) => {
  const data: CheckAggregateJobRequest = {
    jobId: req.query.jobId,
    sourceTableId: req.query.table,
    sourceDatasetId: req.query.dataset
  };

  bigQueryClient
    .job(data.jobId)
    .getMetadata()
    .then(async (value: [any, any]) => {
      if (value[0] && value[0].status && value[0].status.state === 'DONE') {
        /**
         * Job finished, go to the next step of the pipeline which is to update the final data table.
         */
        await createCloudTask(
          'update-final-data',
          `${updateFinalDataUrl}?dataset=${data.sourceDatasetId}&table=${
            data.sourceTableId
          }`,
          omit(data, ['jobId'])
        );
        res.send('Aggregate job finished, started update final data!');
      } else if (value[0].errors) {
        /**
         * Errors in the pipeline, stop.
         */
        res.status(202);
      } else {
        /**
         * Job still running, we create another task to check the job after 5 seconds
         */
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
