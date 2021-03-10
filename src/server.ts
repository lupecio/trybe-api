require('dotenv').config()

import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';
import AppError from './errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/currencies', express.static('currencies.json'));

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    message: 'Internal server error',
  });
});

app.use(function (request: Request, response: Response, _: NextFunction){
	response.status(404).json({
    message: 'Endpoint não encontrado',
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log('Server started on port 3333!');
});
