import { DataRequest } from './data-request.interface';

export interface CheckAggregateJobRequest extends DataRequest {
  jobId: string;
}
