import { Router } from 'express';
import { container } from 'tsyringe';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '@shared/infra/http/middlewares/authMiddleware';
import { UserAvatarController } from '../controllers/UserAvatarController';
import { RefreshTokenController } from '../controllers/RefreshTokenController';
import { addUserInfoToRequestMiddleware } from '@shared/infra/http/middlewares/addUserInfoToRequestMiddleware';

const usersRouter = Router();
const userController = container.resolve(UserController);
const userAvatarController = container.resolve(UserAvatarController);
const refreshTokenController = container.resolve(RefreshTokenController);

const upload = multer(uploadConfig.multer);

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

usersRouter.post(
  '/refresh_token',
  addUserInfoToRequestMiddleware,
  celebrate({
    [Segments.BODY]: {
      refresh_token: Joi.string().required(),
    },
  }),
  refreshTokenController.create,
);

usersRouter.use(authMiddleware);
usersRouter.get('/', userController.index);

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
