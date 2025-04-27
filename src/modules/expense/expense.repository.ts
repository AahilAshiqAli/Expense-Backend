import { EntityRepository } from '~/lib/entity-repository';
import { ExpenseModel, type Expense } from './expense.entity';
import type {
  TransactionCreateDto,
  TransactionIDDTO,
  TransactionUpdateDto,
} from './dtos/transaction.dto';

// we can pass string as id to Mongodb and mongodb will automatically convert it to ObjectId

export class ExpenseRepository extends EntityRepository<Expense> {
  constructor() {
    super(ExpenseModel);
  }
  // here in constructor we are passing ExpenseModel to EntityRepository whih has attribute _model.
  // So whenever we want to call ExpenseModel in this code, we would rather call _model.

  async getAll(TransactionIDDTO: TransactionIDDTO) {
    const userId = TransactionIDDTO.id;
    const transactions = await this._model
      .find({ userId })
      .sort({ date: -1 })
      .lean()
      .exec(); // used to avoid callback-style or to get a true Promise for advanced chaining.
    return transactions;
  }

  async create(createExpenseDto: TransactionCreateDto) {
    const transaction = await this._model.create(createExpenseDto);
    await transaction.save();
  }

  async update(id: TransactionIDDTO, updateExpenseDto: TransactionUpdateDto) {
    await this._model.findOneAndUpdate({ id }, updateExpenseDto, { new: true });
  }

  async delete(id: string) {
    await this._model.deleteOne({ id });
  }
}
