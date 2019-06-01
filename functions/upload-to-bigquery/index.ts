import { BigQuery } from '@google-cloud/bigquery';
import { File, Storage } from '@google-cloud/storage';

const bigQueryClient: BigQuery = new BigQuery();
const storageClient: Storage = new Storage();
const bigQueryDataset: string = 'uber';

const bigQuerySafeName = (fileName: string) => {
  let parsedText = fileName.split('.csv')[0].replace(/[_-]/g, '_');
  parsedText = parsedText.replace(/[^a-zA-Z0-9_]/g, '');
  return parsedText.substring(0, 1024);
};

exports.uploadToBigQuery = (data: any, context: any) => {
  const bucketName: string = data.bucket;
  const fileName: string = data.name;

  if (!fileName.endsWith('.csv')) {
    return;
  }

  const file: File = storageClient.bucket(bucketName).file(fileName);
  const metadata = {
    sourceFormat: 'CSV',
    skipLeadingRows: 1,
    autodetect: true
  };

  return bigQueryClient
    .dataset(bigQueryDataset)
    .table(bigQuerySafeName(fileName))
    .load(file, metadata);
};
