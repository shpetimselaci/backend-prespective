import { Router } from 'express';
import { createUser, getUsers } from './controller';
import { validateRequest } from '../../middlewares/validator';
import { CreateUserBodySchema, GetUsersQuerySchema } from './validation';

const userRouter = Router();

userRouter.post('/', validateRequest({ body: CreateUserBodySchema }), createUser);

userRouter.get('/', validateRequest({ query: GetUsersQuerySchema }), getUsers);

export default userRouter;
