import { Router } from 'express';
import * as ExpenseController from './expense.controller';
import { JwtAuthentication, makeAuthenticate } from '~/lib/authentication';

export const ExpenseRouter = Router();
const auth = new JwtAuthentication();
const authrequired = makeAuthenticate(auth);

ExpenseRouter.use(authrequired);

ExpenseRouter.get('/transactions/:id', ExpenseController.getAllTransactions);
ExpenseRouter.get('/trasnaction/:id', ExpenseController.getTransactionByID);
ExpenseRouter.post('/transaction/', ExpenseController.createTransaction);
ExpenseRouter.put('/transaction/:id', ExpenseController.updateTransaction);
ExpenseRouter.delete('/transaction/:id', ExpenseController.deleteTransaction);
ExpenseRouter.get('/categories/:id', ExpenseController.getAllCategories);
ExpenseRouter.post('/category/', ExpenseController.createCategory);
ExpenseRouter.put('/category/:id', ExpenseController.updateCategory);
ExpenseRouter.delete('/category/:id', ExpenseController.deleteCategory);
ExpenseRouter.get(
  '/transactions-paginated/:id',
  ExpenseController.getAllTransactionsPaginated,
);
