import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';

import routes from './routes';
import { errorMiddleware } from '@shared/infra/http/middlewares/errorMiddleware';
import { rateLimiter } from './middlewares/rateLimiter';
import '@shared/container';
import uploadConfig from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(errors());
app.use(errorMiddleware);

export { app };
