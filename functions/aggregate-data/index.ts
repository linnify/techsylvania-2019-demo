import { Request, Response } from 'express';
import { BigQuery, Table } from '@google-cloud/bigquery';
import { AggregateDataRequest } from './aggregate-data-request';

const { v2beta3 } = require('@google-cloud/tasks');
const bigQueryClient: BigQuery = new BigQuery();
const cloudTaskClient = new v2beta3.CloudTasksClient();

const projectId: string = process.env.GCP_PROJECT;

const createCheckAggregateJobTask = (payload: { jobId: string }) => {
  const queue: string = 'check-aggregate-jobs';
  const location: string = process.env.FUNCTION_REGION;

  const parent = cloudTaskClient.queuePath(projectId, location, queue);

  const task = {
    httpRequest: {
      httpMethod: 'POST',
      url:
        'https://us-central1-techsylvania-2019-demo.cloudfunctions.net/check-aggregate-job',
      body: Buffer.from(JSON.stringify(payload)).toString('base64')
      // headers: {
      //   "Content-Type": "application/json"
      // }
    },
    scheduleTime: {
      seconds: 600 + Date.now() / 1000
    }
  };

  const request = {
    parent,
    task
  };

  return cloudTaskClient.createTask(request);
};

exports.aggregateData = async (req: Request, res: Response) => {
  if (req.method !== 'POST') {
    return;
  }

  const data: AggregateDataRequest = req.body;
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

  return createCheckAggregateJobTask({ jobId: '2112' }).then(() => {
    res.send('Query started');
  });
};
