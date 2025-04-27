import { EntityRepository } from '~/lib/entity-repository';
import { CategoryModel, type Category } from './category.entity';
import type {
  CategoryCreateDto,
  CategoryUpdateDto,
  CategoryIDDTO,
} from './dtos/category.dtos';

export class CategoryRepository extends EntityRepository<Category> {
  constructor() {
    super(CategoryModel);
  }

  async getAll(userId: CategoryIDDTO) {
    const categories = await this._model
      .find({ userId: userId.id })
      .lean()
      .exec(); // used to avoid callback-style or to get a true Promise for advanced chaining.
    return categories;
  }

  async create(createCategoryDto: CategoryCreateDto) {
    const category = await this._model.create(createCategoryDto);
    await category.save();
  }

  async update(
    categoryId: CategoryIDDTO,
    updateCategoryDto: CategoryUpdateDto,
  ) {
    await this._model.findByIdAndUpdate(categoryId.id, updateCategoryDto, {
      new: true,
    });
  }

  async delete(categoryId: CategoryIDDTO) {
    await this._model.findByIdAndDelete(categoryId.id);
  }
}
