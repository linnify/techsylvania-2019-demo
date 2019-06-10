import { File, Storage } from '@google-cloud/storage';
import { BigQuery } from '@google-cloud/bigquery';
import { DataRequest } from '../../types/data-request.interface';
import { bigQuerySafeName, createCloudTask } from '../utils';
import { AGGREGATE_DATA_URL } from '../constants';

const storageClient: Storage = new Storage();
const bigQueryClient: BigQuery = new BigQuery();

const BIGQUERY_DATASET: string = 'uber';

export const uploadToBigQuery = async (data: any, context: any) => {
  const bucketName: string = data.bucket;
  const fileName: string = data.name;
  const file: File = storageClient.bucket(bucketName).file(fileName);

  const metadata = {
    sourceFormat: 'CSV',
    skipLeadingRows: 1, // skip the header row
    autodetect: true, // autodetect the table schema
    writeDisposition: 'WRITE_TRUNCATE' // if the table already exists overwrite the table
  };
  const tableId: string = bigQuerySafeName(fileName);

  await bigQueryClient
    .dataset(BIGQUERY_DATASET)
    .table(tableId)
    .load(file, metadata);

  const aggregateData: DataRequest = {
    sourceDatasetId: BIGQUERY_DATASET,
    sourceTableId: tableId
  };

  // create a task to go to the next step in the pipeline, which is the aggregate data step
  return createCloudTask(
    'aggregate-data',
    `${AGGREGATE_DATA_URL}?dataset=${BIGQUERY_DATASET}&table=${tableId}`,
    aggregateData
  );
};
