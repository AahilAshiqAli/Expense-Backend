import { Schema, model, type InferSchemaType, type Document } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema> & Document;
export type SafeUser = Pick<User, '_id' | 'email' | 'username'>;

export const UserModel = model<User>('user', userSchema);
