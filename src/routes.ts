import { Router, Request, Response } from 'express';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('PRIMEIRO DIA DE NLW');
});

export default routes;
