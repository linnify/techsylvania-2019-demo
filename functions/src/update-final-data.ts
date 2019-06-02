import { Request, Response } from 'express';
import { DataRequest } from '../types/data-request.interface';
import { BigQuery, Table } from '@google-cloud/bigquery';

const bigQueryClient: BigQuery = new BigQuery();
const projectId: string = process.env.GCP_PROJECT;

export const updateFinalData = (req: Request, res: Response) => {
  const data: DataRequest = {
    sourceTableId: req.query.table,
    sourceDatasetId: req.query.dataset
  };

  const query: string = ` SELECT sourceid, dstid, hod, source_name, destination_name, AVG(mean_travel_time) mean_travel_time, 
   AVG(standard_deviation_travel_time) standard_deviation_travel_time, AVG(geometric_mean_travel_time) geometric_mean_travel_time,
   AVG(geometric_standard_deviation_travel_time) geometric_standard_deviation_travel_time
   FROM (
    SELECT sourceid, dstid, hod, source_name, destination_name, mean_travel_time, standard_deviation_travel_time, geometric_mean_travel_time, geometric_standard_deviation_travel_time 
    FROM \`${projectId}.${data.sourceDatasetId}.final_destination\`
    UNION ALL 
    SELECT sourceid, dstid, hod, source_name, destination_name, mean_travel_time, standard_deviation_travel_time, geometric_mean_travel_time, geometric_standard_deviation_travel_time 
    FROM \`${projectId}.${data.sourceDatasetId}.${data.sourceTableId}\`
   )
   GROUP BY sourceid, dstid, hod, source_name, destination_name
  `;

  const destinationTable: Table = bigQueryClient
    .dataset(data.sourceDatasetId)
    .table('final_destination');

  return bigQueryClient
    .createQueryJob({
      query,
      destination: destinationTable,
      writeDisposition: 'WRITE_TRUNCATE'
    })
    .then(() => res.send('Updating final data started!'));
};
