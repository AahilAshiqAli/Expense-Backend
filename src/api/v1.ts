import { Router } from 'express';
import { AuthRouter } from '~/modules/auth/auth.router';
import { UserRouter } from '~/modules/user/user.router';
import { ExpenseRouter } from '~/modules/expense/expense.router';

export const v1 = Router();

v1.use('/auth', AuthRouter);
v1.use('/user', UserRouter);
v1.use('/expense', ExpenseRouter);
