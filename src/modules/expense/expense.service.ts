import { Expenserepository } from './expense.repository';
import { type Expense } from './expense.entity';

export class ExpenseService {
  private readonly _ExpenseRepository = new Expenserepository();

  async getAll(): Promise<Expense[]> {
    const transactions = await this._ExpenseRepository.getAll();
    return transactions;
  }

  async getById(id: string) {
    const transaction = await this._ExpenseRepository.findOne({ id });
    return transaction;
  }

  async createExpense(createExpenseDto: {
    name: string;
    amount: number;
    date: Date;
  }) {
    await this._ExpenseRepository.create(createExpenseDto);
  }

  async updateExpense(
    id: string,
    updateExpenseDto: { id: number; name: string; amount: number; date: Date },
  ) {
    await this._ExpenseRepository.update(id, updateExpenseDto);
  }

  async deleteExpense(id: string) {
    await this._ExpenseRepository.delete(id);
  }
}
