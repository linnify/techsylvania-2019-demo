import * as aggregateFunctions from './src/aggregate';
import * as uploadFileFunctions from './src/upload-file';
import * as updateDataFunctions from './src/update-data';

/**
 * Upload the CSV file from Google Cloud Storage to BigQuery
 */
exports.uploadToBigQuery = uploadFileFunctions.uploadToBigQuery;

/**
 * Set the source name and destination name
 */
exports.aggregateData = aggregateFunctions.aggregateData;

/**
 * Check if the aggregate that job is done
 */
exports.checkAggregateJob = aggregateFunctions.checkAggregateJob;

/**
 * Update average travel time
 */
exports.updateFinalData = updateDataFunctions.updateFinalData;
