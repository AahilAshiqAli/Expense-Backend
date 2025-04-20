import { z } from 'zod';

export const TransactionCreateDto = z.object({
  name: z.string().min(1),
  amount: z.number().min(1),
  date: z.string().min(1),
  userId: z.string().min(1),
});

export const TrasactionIDDTO = z.object({
  id: z.string().min(1),
});
