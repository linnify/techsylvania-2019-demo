import { Request, Response } from 'express';
import { DataRequest } from '../../types/data-request.interface';
import { BigQuery, Table } from '@google-cloud/bigquery';
import createCheckAggregateJobTask from './create-check-aggregate-job-task';

const bigQueryClient: BigQuery = new BigQuery();
const projectId: string = process.env.GCP_PROJECT;

/**
 * Function used to append the source name and the destination name to the data received
 */
export const aggregateData = async (req: Request, res: Response) => {
  const data: DataRequest = {
    sourceDatasetId: req.query.dataset,
    sourceTableId: req.query.table
  };

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

  /**
   * Instantiate a table where the query result will be saved.
   */
  const destinationTableName: string = `${data.sourceTableId}_aggregated`;
  const destinationTable: Table = bigQueryClient
    .dataset(data.sourceDatasetId)
    .table(destinationTableName);

  /**
   * Run the job asynchronously
   */
  const [job] = await bigQueryClient.createQueryJob({
    query,
    destination: destinationTable,
    writeDisposition: 'WRITE_TRUNCATE'
  });

  /**
   * Create a task to check if the job finished.
   */
  await createCheckAggregateJobTask(
    data.sourceDatasetId,
    destinationTableName,
    job.id
  );

  return res.send('Query started');
};
