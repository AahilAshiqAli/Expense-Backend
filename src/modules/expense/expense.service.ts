import { ExpenseRepository } from './expense.repository';
import { UserRepository } from '../user/user.repository';
import type {
  TransactionCreateDto,
  TransactionIDDTO,
  TransactionUpdateDto,
  TransactionPaginatedDto,
} from './dtos/transaction.dto';
import { CategoryRepository } from './category.repository';
import type {
  CategoryCreateDto,
  CategoryUpdateDto,
  CategoryIDDTO,
} from './dtos/category.dtos';

// According to chatgpt, conversion of datatypes like here, converting string to date is done in service layer.

export class ExpenseService {
  private readonly _ExpenseRepository = new ExpenseRepository();
  private readonly _UserRepository = new UserRepository();
  private readonly _CategoryRepository = new CategoryRepository();

  async getAll(TransactionIDDto: TransactionIDDTO) {
    const transactions = await this._ExpenseRepository.getAll(TransactionIDDto);
    return transactions;
  }

  async getById(TransactionIDDto: TransactionIDDTO) {
    const transaction = await this._ExpenseRepository.findOne({
      id: TransactionIDDto.id,
    });
    return transaction;
  }

  async createExpense(createExpenseDto: TransactionCreateDto) {
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
    TransactionIDDto: TransactionIDDTO,
    updateExpenseDto: TransactionUpdateDto,
  ) {
    const user = await this._UserRepository.findById(updateExpenseDto.userId);
    if (user === null) {
      throw new Error('User not found');
    }
    await this._ExpenseRepository.update(TransactionIDDto, {
      ...updateExpenseDto,
      date: new Date(updateExpenseDto.date),
    });
  }

  async deleteExpense(Transactionid: TransactionIDDTO) {
    await this._ExpenseRepository.delete(Transactionid.id);
  }

  async getAllCategories(userId: CategoryIDDTO) {
    const categories = await this._CategoryRepository.getAll(userId);
    return categories;
  }

  async createCategory(createCategoryDto: CategoryCreateDto) {
    const user = await this._UserRepository.findById(createCategoryDto.userId);
    if (user === null) {
      throw new Error('User not found');
    }
    await this._CategoryRepository.create(createCategoryDto);
  }

  async updateCategory(
    categoryId: CategoryIDDTO,
    updateCategoryDto: CategoryUpdateDto,
  ) {
    const user = await this._UserRepository.findById(updateCategoryDto.userId);
    if (user === null) {
      throw new Error('User not found');
    }
    await this._CategoryRepository.update(categoryId, updateCategoryDto);
  }

  async deleteCategory(categoryId: CategoryIDDTO) {
    await this._CategoryRepository.delete(categoryId);
  }

  async getPaginatedTransactions(
    TransactionIDDto: TransactionIDDTO,
    TransactionPaginatedDto: TransactionPaginatedDto,
  ) {
    const page = Number(TransactionPaginatedDto.page);
    const transactions = await this._ExpenseRepository.getAll(TransactionIDDto);
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return transactions.slice(startIndex, endIndex);
  }
}
