import { ExpenseRepository } from './expense.repository';
import { type Expense } from './expense.entity';
import { UserRepository } from '../user/user.repository';

export class ExpenseService {
  private readonly _ExpenseRepository = new ExpenseRepository();
  private readonly _UserRepository = new UserRepository();

  async getAll(): Promise<Expense[]> {
    const transactions = await this._ExpenseRepository.getAll();
    return transactions;
  }

  async getById(id: string) {
    const transaction = await this._ExpenseRepository.findOne({ id });
    return transaction;
  }

  async createExpense(createExpenseDto: {
    type: string;
    name: string;
    amount: number;
    date: string;
    userId: string;
  }) {
    const user = await this._UserRepository.findById(createExpenseDto.userId);
    if (user === null) {
      throw new Error('User not found');
    }
    await this._ExpenseRepository.create({
      ...createExpenseDto,
      date: new Date(createExpenseDto.date),
    });
  }

  async updateExpense(
    id: string,
    updateExpenseDto: {
      id: number;
      name: string;
      amount: number;
      date: string;
      type: string;
      userId: string;
    },
  ) {
    const user = await this._UserRepository.findById(updateExpenseDto.userId);
    if (user === null) {
      throw new Error('User not found');
    }
    await this._ExpenseRepository.update(id, {
      ...updateExpenseDto,
      date: new Date(updateExpenseDto.date),
    });
  }

  async deleteExpense(id: string) {
    await this._ExpenseRepository.delete(id);
  }
}
