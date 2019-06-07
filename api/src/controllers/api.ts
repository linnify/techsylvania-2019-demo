import { BigQuery } from '@google-cloud/bigquery';
import { Request, Response } from 'express';
import { DataRow } from '../types/data-row.interface';
import { PROJECT_ID } from '../config/constants';

const bigQueryClient: BigQuery = new BigQuery();

/**
 * GET /
 * Check Health on our API
 */
export const checkHealth = (req: Request, res: Response) => {
  return res.send('Ok');
};

export const getMaxMeanValue = async (req: Request, res: Response) => {
  const query: string = `
    SELECT * FROM (
        SELECT sourceid AS sourceId, dstid AS destinationId, 
        source_name AS sourceName, destination_name AS destinationName, 
        AVG(mean_travel_time) as meanTravelTime 
        FROM \`${PROJECT_ID}.uber.final_destination\`
        GROUP BY sourceId, destinationId, sourceName, destinationName
        ORDER BY meanTravelTime DESC
    )
    LIMIT 1
  `;

  const [job] = await bigQueryClient.createQueryJob({ query });

  const [rows] = await job.getQueryResults();

  const dataRow: DataRow = rows[0];
  res.json(dataRow);
};
