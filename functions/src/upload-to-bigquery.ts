import { File, Storage } from '@google-cloud/storage';
import { BigQuery } from '@google-cloud/bigquery';
import { DataRequest } from '../types/data-request.interface';
import { aggregateDataUrl, createCloudTask } from './utils';

const storageClient: Storage = new Storage();
const bigQueryClient: BigQuery = new BigQuery();

const bigQueryDataset: string = 'uber';

/**
 * Parse the name of the file to transform it into a table name accepted by bigquery
 */
const bigQuerySafeName = (fileName: string) => {
  let parsedText = fileName.split('.csv')[0].replace(/[_-]/g, '_');
  parsedText = parsedText.replace(/[^a-zA-Z0-9_]/g, '');
  return parsedText.substring(0, 1024);
};

export const uploadToBigQuery = (data: any, context: any) => {
  const bucketName: string = data.bucket;
  const fileName: string = data.name;

  if (!fileName.endsWith('.csv')) {
    console.log('Not a CSV file');
    return;
  }

  const file: File = storageClient.bucket(bucketName).file(fileName);

  const metadata = {
    sourceFormat: 'CSV',
    skipLeadingRows: 1, // skip the header row
    autodetect: true, // autodetect the table schema
    writeDisposition: 'WRITE_TRUNCATE' // if the table already exists overwrite the table
  };
  const tableId: string = bigQuerySafeName(fileName);

  return bigQueryClient
    .dataset(bigQueryDataset)
    .table(tableId)
    .load(file, metadata)
    .then(() => {
      const aggregateData: DataRequest = {
        sourceDatasetId: bigQueryDataset,
        sourceTableId: tableId
      };

      // create a task to go to the next step in the pipeline, which is the aggregate data step
      return createCloudTask(
        'aggregate-data',
        `${aggregateDataUrl}?dataset=${bigQueryDataset}&table=${tableId}`,
        aggregateData
      );
    });
};
