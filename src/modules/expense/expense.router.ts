import { Router } from 'express';
import * as ExpenseController from './expense.controller';
import { JwtAuthentication, makeAuthenticate } from '~/lib/authentication';

export const ExpenseRouter = Router();
const auth = new JwtAuthentication();
const authrequired = makeAuthenticate(auth);

// ExpenseRouter.use(authrequired);

ExpenseRouter.get('/transactions/', ExpenseController.getAllTransactions);
ExpenseRouter.get('/trasnaction/:id', ExpenseController.getTransactionByID);
ExpenseRouter.post('/transaction/', ExpenseController.createTransaction);
ExpenseRouter.put('/transation/:id', ExpenseController.updateTransaction);
ExpenseRouter.delete('/transaction/:id', ExpenseController.deleteTransaction);
