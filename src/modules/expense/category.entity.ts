import { Schema, model, type InferSchemaType, Types } from 'mongoose';

const categorySchema = new Schema({
  name: { type: String, required: true },
  monthlyLimit: { type: Number, required: true },
  userId: {
    type: Types.ObjectId,
    ref: 'User', // This should match User model name
    required: true,
  },
});

export type Category = InferSchemaType<typeof categorySchema>;
export const CategoryModel = model<Category>('category', categorySchema);
