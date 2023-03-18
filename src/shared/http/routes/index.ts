import productsRouter from '@modules/products/routes/products.routes';
import loginRouter from '@modules/users/routes/login.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/login', loginRouter);
routes.use('/password', passwordRouter);

export default routes;
