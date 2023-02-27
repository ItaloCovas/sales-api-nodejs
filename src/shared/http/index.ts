import express from 'express';
import cors from 'cors';

import routes from './routes';
import errorMiddleware from '@middlewares/errorMiddleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

app.listen(3333, () => {
  console.log('Server started at http://localhost:3333 🏆🔥');
});
