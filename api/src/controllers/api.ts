import { Response, Request } from 'express';
import { BigQuery } from '@google-cloud/bigquery';

const bigQueryClient: BigQuery = new BigQuery();
const bigQueryDataset: string = 'uber';
const bigQueryTable: string = 'final_destination';

/**
 * GET /
 * Check Health on our API
 */
export const health = (req: Request, res: Response) => {
  return res.send('Ok');
};

export const data = async (req: Request, res: Response) => {
  const [rows] = await bigQueryClient
    .dataset(bigQueryDataset)
    .table(bigQueryTable)
    .getRows({
      maxResults: 20
    });

  return res.send(rows);
};
