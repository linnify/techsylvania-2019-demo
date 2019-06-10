import { Response, Request } from 'express';
import { BigQuery } from '@google-cloud/bigquery';
import {
  BIGQUERY_DATASET,
  BIGQUERY_LOCATION_TABLE,
  PROJECT_ID
} from '../config/constants';
import { Params } from '../types/params.interface';

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

/**
 * Get Average Travel Time per hour
 * @param req
 * @param res
 */
export const getAveragesPerHour = async (req: Request, res: Response) => {
  const { source, destination } = req.query as Params;

  const query: string = `
    SELECT sourceid AS sourceId, dstid AS destinationId, 
    source_name AS sourceName, destination_name AS destinationName, mean_travel_time AS meanTravelTime,
    hod AS hourOfDay
    FROM \`${PROJECT_ID}.${BIGQUERY_DATASET}.final_destination\`
    WHERE dstid = ${destination} AND sourceid = ${source}
    ORDER BY hourOfDay
  `;

  try {
    const [job] = await bigQueryClient.createQueryJob({ query });

    const [rows] = await job.getQueryResults();

    return res.json(rows);
  } catch (e) {
    return res.status(200).send();
  }
};
