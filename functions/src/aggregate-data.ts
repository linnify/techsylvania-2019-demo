import { Request, Response } from 'express';
import { AggregateDataRequest } from '../types/aggregate-data-request.interface';
import { BigQuery, Table } from '@google-cloud/bigquery';
import { createCloudTask } from './utils';

const bigQueryClient: BigQuery = new BigQuery();
const projectId: string = process.env.GCP_PROJECT;
const checkAggregateJobUrl: string =
  'https://us-central1-techsylvania-2019-demo.cloudfunctions.net/check-aggregate-job';

export const aggregateData = async (req: Request, res: Response) => {
  if (req.method !== 'POST') {
    res.status(202);
  }

  const data: AggregateDataRequest = req.body;

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
  const destinationTable: Table = bigQueryClient
    .dataset(data.sourceDatasetId)
    .table(`${data.sourceTableId}_aggregated`);

  // const [job] = await bigQueryClient
  // .createQueryJob({
  //   query,
  //   destination: destinationTable
  // });

  return createCloudTask(checkAggregateJobUrl, { jobId: '2112' }).then(() => {
    res.send('Query started');
  });
};
