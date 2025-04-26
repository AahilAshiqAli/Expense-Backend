import { z } from 'zod';
import mongoose from 'mongoose';

export const TransactionCreateDto = z.object({
  type: z
    .string()
    .min(1)
    .refine((val) => val === 'expense' || val === 'income', {
      message: 'Invalid type — must be expense or income',
    }),
  name: z.string().min(1),
  amount: z.number().min(1),
  date: z.string().min(1),
  userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid userId — must be a valid ObjectId',
  }),
});

export const TrasactionIDDTO = z.object({
  id: z.string().min(1),
});
