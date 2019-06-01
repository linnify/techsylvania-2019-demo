import { Request, Response } from 'express';
import { BigQuery } from '@google-cloud/bigquery';

const bigQueryClient: BigQuery = new BigQuery();

exports.updateFinalData = (req: Request, res: Response) => {
  if (req.method !== 'POST') {
    return;
  }

  console.log(req.body);
  console.log(req.method);
  res.send(`Hello World!`);
};
