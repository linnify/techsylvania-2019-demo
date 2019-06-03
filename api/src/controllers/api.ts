import { BigQuery } from '@google-cloud/bigquery';
import { Request, Response } from 'express';
import { DataRow } from '../types/data-row.interface';

const bigQueryClient: BigQuery = new BigQuery();

/**
 * GET /
 * Check Health on our API
 */
export let health = (req: Request, res: Response) => {
  return res.send('Ok');
};

export const getMaxMeanValue = async (req: Request, res: Response) => {
  const query: string = `
    SELECT * FROM (
        SELECT sourceid AS sourceId, dstid AS destinationId, 
        source_name AS sourceName, destination_name AS destinationName, 
        AVG(mean_travel_time) as meanTravelTime 
        FROM \`techsylvania-2019-demo.uber.final_destination\`
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
