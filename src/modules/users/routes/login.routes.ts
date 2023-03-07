import { Router } from 'express';
import { container } from 'tsyringe';
import { celebrate, Joi, Segments } from 'celebrate';
import { LoginController } from '../controllers/LoginController';

const loginRouter = Router();
const loginController = container.resolve(LoginController);

loginRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  loginController.create,
);

export default loginRouter;
