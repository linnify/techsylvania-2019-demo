import { BigQuery, Dataset, Table } from '@google-cloud/bigquery';
import { Request, Response } from 'express';
import { DataRow } from '../types/data-row.interface';
import {
  BIGQUERY_DATASET,
  BIGQUERY_FINAL_TABLE,
  PROJECT_ID
} from '../config/constants';

const bigQueryClient: BigQuery = new BigQuery();
//Nothing to see here
/**
 * GET /
 * Check Health on our API
 */
export const checkHealth = (req: Request, res: Response) => {
  return res.send('Ok');
};

export const getLastModified = async (req: Request, res: Response) => {
  const dataset = new Dataset(bigQueryClient, BIGQUERY_DATASET);
  const table = new Table(dataset, BIGQUERY_FINAL_TABLE);

  const [metadata] = await table.getMetadata();

  return res.json(metadata.lastModifiedTime);
};

export const getMaxMeanValue = async (req: Request, res: Response) => {
  const query: string = `
    SELECT * FROM (
        SELECT sourceid AS sourceId, dstid AS destinationId, 
        source_name AS sourceName, destination_name AS destinationName, 
        AVG(mean_travel_time) as meanTravelTime 
        FROM \`${PROJECT_ID}.${BIGQUERY_DATASET}.final_destination\`
        GROUP BY sourceId, destinationId, sourceName, destinationName
        ORDER BY meanTravelTime DESC
    )
    LIMIT 1
  `;

  try {
    const [job] = await bigQueryClient.createQueryJob({ query });
    const [rows] = await job.getQueryResults();

    const dataRow: DataRow = rows[0];
    return res.json(dataRow);
  } catch (e) {
    return res.status(200).send();
  }
};
