import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { OrderController } from '../controllers/OrderController';
import { authMiddleware } from '@shared/http/middlewares/authMiddleware';
import { container } from 'tsyringe';

const ordersRouter = Router();
const ordersController = container.resolve(OrderController);

ordersRouter.use(authMiddleware);

ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.show,
);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  ordersController.create,
);

export default ordersRouter;
