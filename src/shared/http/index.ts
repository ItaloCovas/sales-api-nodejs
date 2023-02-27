import 'reflect-metadata';
import dataSource from '@shared/typeorm';

import { app } from './app';

dataSource.initialize().then(() => {
  app.listen(3333, () => {
    console.log('Server started at http://localhost:3333 🏆🔥');
  });
});
