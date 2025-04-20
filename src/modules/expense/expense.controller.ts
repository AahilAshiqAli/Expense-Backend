import { type Request, type Response } from 'express';
import { ExpenseService } from './expense.service';
import { makeHandler } from '~/lib/core/make-handler';
import { StatusCodes } from 'http-status-codes';
import { TransactionCreateDto, TrasactionIDDTO } from './dtos/transaction.dto';

const expenseService = new ExpenseService();

// Question : Should i write code to catch undefined and null?
// IF all code paths return a value, then function would never return undefined or null
// So you dont need to check for undefined or null

// we usually make dtos only for incoming request objects not for outgoing response objects becuase we dont trust external services
export const getAllTransactions = makeHandler(
  {},
  async (req: Request, res: Response) => {
    try {
      const transactions = await expenseService.getAll();
      if (transactions.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: 'No transactions found' });
      }
      return res.status(StatusCodes.OK).json(transactions);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  },
);

export const getTransactionByID = makeHandler(
  { params: TrasactionIDDTO },
  async (req: Request, res: Response) => {
    try {
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      const id = req.params.id as string;
      const transaction = await expenseService.getById(id);
      if (transaction === null || Object.keys(transaction).length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: 'No transactions found' });
      }
      return res.status(StatusCodes.OK).json(transaction);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  },
);

export const createTransaction = makeHandler(
  { body: TransactionCreateDto },
  async (req: Request, res: Response) => {
    try {
      const transaction = req.body as {
        name: string;
        amount: number;
        date: string;
      };
      await expenseService.createExpense(transaction);
      return res
        .status(StatusCodes.CREATED)
        .json({ message: 'Transaction created successfully' });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  },
);

export const updateTransaction = makeHandler(
  { params: TrasactionIDDTO, body: TransactionCreateDto },
  async (req: Request, res: Response) => {
    try {
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      const id = req.params.id as string;
      const transaction = req.body as {
        id: number;
        name: string;
        amount: number;
        date: Date;
      };
      await expenseService.updateExpense(id, transaction);
      return res
        .status(StatusCodes.OK)
        .json({ message: 'Transaction updated successfully' });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  },
);

export const deleteTransaction = makeHandler(
  { params: TrasactionIDDTO },
  async (req: Request, res: Response) => {
    try {
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      const id = req.params.id as string;
      await expenseService.deleteExpense(id);
      return res
        .status(StatusCodes.OK)
        .json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  },
);
