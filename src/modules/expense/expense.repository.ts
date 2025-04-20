import { EntityRepository } from '~/lib/entity-repository';
import { ExpenseModel, type Expense } from './expense.entity';

export class Expenserepository extends EntityRepository<Expense> {
    constructor(){
        super(ExpenseModel);
    }
    // here in constructor we are passing ExpenseModel to EntityRepository whih has attribute _model.
    // So whenever we want to call ExpenseModel in this code, we would rather call _model.

    async getAll(): Promise<Expense[]> {
        const transactions = await this._model.find({})
          .lean()
          .exec(); // used to avoid callback-style or to get a true Promise for advanced chaining.
        return transactions;
      }

    async create(createExpenseDto : {name : string, amount : number, date : Date}){
        const transaction = await this._model.create(createExpenseDto)
        await transaction.save();
    } 

    async update(id : string, updateExpenseDto : {id : number, name : string, amount : number, date : Date}){
        await this._model.findOneAndUpdate({id}, updateExpenseDto, {new : true})
    }

    async delete(id : string){
        await this._model.deleteOne({id});
    }

}