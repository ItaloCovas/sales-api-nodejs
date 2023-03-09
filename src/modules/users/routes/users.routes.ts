import { Router } from 'express';
import { container } from 'tsyringe';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '@shared/middlewares/authMiddleware';
import { UserAvatarController } from '../controllers/UserAvatarController';

const usersRouter = Router();
const userController = container.resolve(UserController);
const userAvatarController = container.resolve(UserAvatarController);

const upload = multer(uploadConfig);

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

usersRouter.use(authMiddleware);
usersRouter.get('/', userController.index);

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
