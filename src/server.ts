import express, { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import routes from './routes';
import './database';

dotenv.config();

const app = express();

app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server error',
  });
});

app.listen(process.env.PORT, () => {
  console.log('NLW SECOND DAY');
});
