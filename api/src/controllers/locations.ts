import { Response, Request } from 'express';
import { BigQuery } from '@google-cloud/bigquery';
import { BIGQUERY_DATASET, BIGQUERY_LOCATION_TABLE } from '../config/constants';

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
