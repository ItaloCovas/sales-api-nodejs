import 'dotenv/config';
import 'reflect-metadata';
import dataSource from '@shared/infra/typeorm';

import { app } from './app';

dataSource.initialize().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT} 🏆🔥`);
  });
});
