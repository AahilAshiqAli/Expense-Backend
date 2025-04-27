import { ExpenseService } from './expense.service';
import { makeHandler } from '~/lib/core/make-handler';
import { StatusCodes } from 'http-status-codes';
import {
  TransactionCreateDto,
  TransactionIDDTO,
  TransactionPaginatedDto,
  TransactionUpdateDto,
} from './dtos/transaction.dto';
import {
  CategoryCreateDto,
  CategoryUpdateDto,
  CategoryIDDTO,
} from './dtos/category.dtos';

const expenseService = new ExpenseService();

// Question : Should i write code to catch undefined and null?
// IF all code paths return a value, then function would never return undefined or null
// So you dont need to check for undefined or null

// we usually make dtos only for incoming request objects not for outgoing response objects becuase we dont trust external services
export const getAllTransactions = makeHandler(
  { params: TransactionIDDTO },
  async (req, res) => {
    try {
      const transactions = await expenseService.getAll(req.params);
      if (transactions.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: 'No transactions found' });
      }
      return res.status(StatusCodes.OK).json(transactions);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: `Internal server error: ${error.message}` });
      }

      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Unknown Internal server error' });
    }
  },
);

export const getTransactionByID = makeHandler(
  { params: TransactionIDDTO },
  async (req, res) => {
    try {
      const transaction = await expenseService.getById(req.params);
      if (transaction === null || Object.keys(transaction).length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: 'No transactions found' });
      }
      return res.status(StatusCodes.OK).json(transaction);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: `Internal server error: ${error.message}` });
      }

      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Unknown Internal server error' });
    }
  },
);

export const createTransaction = makeHandler(
  { body: TransactionCreateDto },
  async (req, res) => {
    try {
      await expenseService.createExpense(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json({ message: 'Transaction created successfully' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: `Internal server error: ${error.message}` });
      }

      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Unknown Internal server error' });
    }
  },
);

export const updateTransaction = makeHandler(
  { params: TransactionIDDTO, body: TransactionUpdateDto },
  async (req, res) => {
    try {
      await expenseService.updateExpense(req.params, req.body);
      return res
        .status(StatusCodes.OK)
        .json({ message: 'Transaction updated successfully' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: `Internal server error: ${error.message}` });
      }

      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Unknown Internal server error' });
    }
  },
);

export const deleteTransaction = makeHandler(
  { params: TransactionIDDTO },
  async (req, res) => {
    try {
      await expenseService.deleteExpense(req.params);
      return res
        .status(StatusCodes.OK)
        .json({ message: 'Transaction deleted successfully' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: `Internal server error: ${error.message}` });
      }

      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Unknown Internal server error' });
    }
  },
);

export const getAllCategories = makeHandler(
  { params: CategoryIDDTO },
  async (req, res) => {
    try {
      const categories = await expenseService.getAllCategories(req.params);
      if (categories.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: 'No categories found' });
      }
      return res.status(StatusCodes.OK).json(categories);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: `Internal server error: ${error.message}` });
      }
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Unknown Internal server error' });
    }
  },
);

export const createCategory = makeHandler(
  { body: CategoryCreateDto },
  async (req, res) => {
    try {
      await expenseService.createCategory(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json({ message: 'Category created successfully' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: `Internal server error: ${error.message}` });
      }
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Unknown Internal server error' });
    }
  },
);

export const updateCategory = makeHandler(
  { params: CategoryIDDTO, body: CategoryUpdateDto },
  async (req, res) => {
    try {
      await expenseService.updateCategory(req.params, req.body);
      return res
        .status(StatusCodes.OK)
        .json({ message: 'Category updated successfully' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: `Internal server error: ${error.message}` });
      }
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Unknown Internal server error' });
    }
  },
);

export const deleteCategory = makeHandler(
  { params: CategoryIDDTO },
  async (req, res) => {
    try {
      await expenseService.deleteCategory(req.params);
      return res
        .status(StatusCodes.OK)
        .json({ message: 'Category deleted successfully' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: `Internal server error: ${error.message}` });
      }
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Unknown Internal server error' });
    }
  },
);

export const getAllTransactionsPaginated = makeHandler(
  { params: TransactionIDDTO, query: TransactionPaginatedDto },
  async (req, res) => {
    try {
      const transactions = await expenseService.getPaginatedTransactions(
        req.params,
        req.query,
      );
      if (transactions.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: 'No transactions found' });
      }
      return res.status(StatusCodes.OK).json(transactions);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: `Internal server error: ${error.message}` });
      }
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Unknown Internal server error' });
    }
  },
);
