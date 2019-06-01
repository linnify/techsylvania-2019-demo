import { Response, Request } from 'express';

/**
 * GET /
 * Check Health on our API
 */
export let health = (req: Request, res: Response) => {
  return res.send('Ok');
};
