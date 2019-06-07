import { Response, Request } from 'express';
import { BigQuery } from '@google-cloud/bigquery';
import {
  BIGQUERY_DATASET,
  BIGQUERY_LOCATION_TABLE,
  PROJECT_ID
} from '../config/constants';
import { DataRow } from '../types/data-row.interface';
import { Path } from '../types/path.interface';

const bigQueryClient: BigQuery = new BigQuery();

/**
 * Get All the locations from our app
 * @param req
 * @param res
 */
export const getAll = async (req: Request, res: Response) => {
  const [rows] = await bigQueryClient
    .dataset(BIGQUERY_DATASET)
    .table(BIGQUERY_LOCATION_TABLE)
    .getRows();

  return res.send(rows);
};

export const getAveragesPerHour = async (req: Request, res: Response) => {
  const path: Path = req.params;

  const query: string = `
    SELECT sourceid AS sourceId, dstid AS destinationId, 
    source_name AS sourceName, destination_name AS destinationName, mean_travel_time AS meanTravelTime,
    hod AS hourOfDay
    FROM \`${PROJECT_ID}.uber.final_destination\`
    WHERE dstid = ${path.destinationId} AND sourceid = ${path.sourceId}
    ORDER BY hourOfDay
  `;

  const [job] = await bigQueryClient.createQueryJob({ query });

  const [rows] = await job.getQueryResults();

  const dataRows: DataRow[] = rows;
  res.json(dataRows);
};
