import { Request, Response } from 'express';
import { DataRequest } from '../types/data-request.interface';
import { BigQuery, Table } from '@google-cloud/bigquery';
import { checkAggregateJobUrl, createCloudTask } from './utils';
import { CheckAggregateJobRequest } from '../types/check-aggregate-job-request.interface';
import { Metadata } from '@google-cloud/common';

const bigQueryClient: BigQuery = new BigQuery();
const projectId: string = process.env.GCP_PROJECT;

export const aggregateData = async (req: Request, res: Response) => {
  if (req.method !== 'POST') {
    res.status(202);
  }

  const data: DataRequest = req.body;

  console.log(data);
  const query: string = `SELECT final_data.*, source.display_name AS source_name, destination.display_name AS destination_name
     FROM \`${projectId}.${data.sourceDatasetId}.${
    data.sourceTableId
  }\` AS final_data
     LEFT JOIN \`${projectId}.${
    data.sourceDatasetId
  }.geo_boundries\` AS source ON source.movement_id = sourceid
     LEFT JOIN \`${projectId}.${
    data.sourceDatasetId
  }.geo_boundries\` AS destination ON destination.movement_id = dstid
    `;
  const destinationTableName: string = `${data.sourceTableId}_aggregated`;
  const destinationTable: Table = bigQueryClient
    .dataset(data.sourceDatasetId)
    .table(destinationTableName);

  const [job] = await bigQueryClient.createQueryJob({
    query,
    destination: destinationTable
  });

  const checkAggregateData: CheckAggregateJobRequest = {
    sourceDatasetId: data.sourceDatasetId,
    sourceTableId: destinationTableName,
    jobId: job.id
  };
  return createCloudTask(
    'check-aggregate-job',
    checkAggregateJobUrl,
    checkAggregateData
  ).then(() => {
    res.send('Query started');
  });
};
