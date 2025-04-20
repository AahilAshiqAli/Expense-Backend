import { Router } from 'express';
import * as ExpenseController from './expense.controller';

export const ExpenseRouter = Router();

ExpenseRouter.get('/transactions/', ExpenseController.getAllTransactions);
ExpenseRouter.get('/trasnaction/:id', ExpenseController.getTransactionByID);
ExpenseRouter.post('/transaction/', ExpenseController.createTransaction);
ExpenseRouter.put('/transation/:id', ExpenseController.updateTransaction);
ExpenseRouter.delete('/transaction/:id', ExpenseController.deleteTransaction);
