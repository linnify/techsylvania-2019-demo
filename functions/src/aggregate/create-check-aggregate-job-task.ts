import { CHECK_AGGREGATE_JOB_URL } from '../constants';
import { CheckAggregateJobRequest } from '../../types/check-aggregate-job-request.interface';
import { createCloudTask } from '../utils';

export default (
  sourceDatasetId: string,
  sourceTableId: string,
  jobId: string
) => {
  const queue = 'check-aggregate-job';
  const checkAggregateJobURL = `${CHECK_AGGREGATE_JOB_URL}?sourceDatasetId=${sourceDatasetId}&sourceTableId=${sourceTableId}&jobId=${jobId}`;
  const checkAggregateData: CheckAggregateJobRequest = {
    sourceDatasetId,
    sourceTableId,
    jobId
  };

  return createCloudTask(queue, checkAggregateJobURL, checkAggregateData, 5);
};
