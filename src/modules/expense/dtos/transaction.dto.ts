import { z } from 'zod';
import mongoose from 'mongoose';

export const TransactionCreateDto = z.object({
  type: z.enum(['expense', 'income']),
  name: z.string().min(1),
  amount: z.number().min(1),
  date: z.union([z.string().min(1), z.date()]),
  userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid userId — must be a valid ObjectId',
  }),
  category: z.string().min(1),
});

export type TransactionCreateDto = z.infer<typeof TransactionCreateDto>;

export const TransactionIDDTO = z.object({
  id: z.string().min(1),
});

export type TransactionIDDTO = z.infer<typeof TransactionIDDTO>;

export const TransactionUpdateDto = z.object({
  id: z.number().min(1),
  name: z.string().min(1),
  amount: z.number().min(1),
  date: z.union([z.string().min(1), z.date()]),
  type: z.enum(['expense', 'income']),
  userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid userId — must be a valid ObjectId',
  }),
  category: z.string().min(1),
});

export type TransactionUpdateDto = z.infer<typeof TransactionUpdateDto>;

export const TransactionPaginatedDto = z.object({
  page: z.enum(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']),
});

export type TransactionPaginatedDto = z.infer<typeof TransactionPaginatedDto>;
