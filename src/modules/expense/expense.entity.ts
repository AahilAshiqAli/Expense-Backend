import { Schema, model, type InferSchemaType, Types } from 'mongoose';

const expenseSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      default: () => new Types.ObjectId().toHexString(), // generates a custom id string if needed
    },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    type: { type: String, enum: ['expense', 'income'], required: true },

    // Reference to User collection
    userId: {
      type: Types.ObjectId,
      ref: 'User', // This should match User model name
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// creating index for faster search for just date and userID
expenseSchema.index({ userId: 1, date: -1 });

export type Expense = InferSchemaType<typeof expenseSchema>;
export const ExpenseModel = model<Expense>('expense', expenseSchema);
