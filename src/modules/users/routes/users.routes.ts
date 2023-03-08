import { Router } from 'express';
import { container } from 'tsyringe';
import { celebrate, Joi, Segments } from 'celebrate';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '@shared/middlewares/authMiddleware';

const usersRouter = Router();
const userController = container.resolve(UserController);

usersRouter.get('/', authMiddleware, userController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

export default usersRouter;
