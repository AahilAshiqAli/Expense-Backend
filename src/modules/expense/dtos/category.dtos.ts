import { z } from 'zod';
import mongoose from 'mongoose';

export const CategoryCreateDto = z.object({
  name: z.string().min(1),
  monthlyLimit: z.number().min(1),
  userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid userId — must be a valid ObjectId',
  }),
});

export type CategoryCreateDto = z.infer<typeof CategoryCreateDto>;

export const CategoryUpdateDto = z.object({
  name: z.string().min(1),
  monthlyLimit: z.number().min(1),
  userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid userId — must be a valid ObjectId',
  }),
});

export type CategoryUpdateDto = z.infer<typeof CategoryUpdateDto>;

export const CategoryIDDTO = z.object({
  id: z.string().min(1),
});

export type CategoryIDDTO = z.infer<typeof CategoryIDDTO>;
