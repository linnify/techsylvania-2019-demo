import { Request, Response } from 'express';
import { BigQuery } from '@google-cloud/bigquery';
import { CheckAggregateJobRequest } from '../../types/check-aggregate-job-request.interface';
import createCheckAggregateJobTask from './create-check-aggregate-job-task';
import { createCloudTask } from '../utils';
import { UPDATE_FINAL_DATA_URL } from '../constants';

const bigQueryClient: BigQuery = new BigQuery();

/**
 * Function used to check the current status of a job.
 */
export const checkAggregateJob = async (req: Request, res: Response) => {
  const {
    jobId,
    sourceTableId,
    sourceDatasetId
  } = req.query as CheckAggregateJobRequest;

  const [metadata, response] = await bigQueryClient.job(jobId).getMetadata();

  if (metadata.status && metadata.status.state === 'DONE') {
    /**
     * Job finished, go to the next step of the pipeline which is to update the final data table.
     */
    await createCloudTask(
      'update-final-data',
      `${UPDATE_FINAL_DATA_URL}?dataset=${sourceDatasetId}&table=${sourceTableId}`
    );
    return res.send('Aggregate job finished, started update final data!');
  }

  /**
   * Job still running, we create another task to check the job after 5 seconds
   */
  await createCheckAggregateJobTask(sourceDatasetId, sourceTableId, jobId);

  return res.send('Aggregate job still in progress!');
};
