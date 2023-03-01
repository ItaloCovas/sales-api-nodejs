import express from 'express';
import cors from 'cors';

import routes from './routes';
import { errorMiddleware } from '@middlewares/errorMiddleware';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

export { app };
