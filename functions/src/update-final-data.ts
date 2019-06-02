import { Request, Response } from 'express';

export const updateFinalData = (req: Request, res: Response) => {
  if (req.method !== 'POST') {
    res.status(202);
  }

  console.log(req.body);
  console.log(req.method);
  res.send(`Hello World!`);
};
