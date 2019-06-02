import { uploadToBigQuery } from './src/upload-to-bigquery';
import { aggregateData } from './src/aggregate-data';
import { updateFinalData } from './src/update-final-data';
import { checkAggregateJob } from './src/check-aggregate-job';

exports.uploadToBigQuery = uploadToBigQuery;
exports.aggregateData = aggregateData;
exports.checkAggregateJob = checkAggregateJob;
exports.updateFinalData = updateFinalData;
