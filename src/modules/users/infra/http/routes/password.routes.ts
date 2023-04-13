import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { UserEmailTokenController } from '../controllers/UserEmailTokenController';
import { container } from 'tsyringe';

const passwordRouter = Router();
const userEmailTokenController = container.resolve(UserEmailTokenController);

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  userEmailTokenController.create,
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  userEmailTokenController.update,
);

export default passwordRouter;
