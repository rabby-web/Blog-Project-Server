import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query }; // copy

    // Filtering
    const excludeFields = ['search', 'sortBy'];

    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sortBy() {
    const sortBy =
      (this?.query?.sortBy as string)?.split(',')?.join(' ') || '-createdAt';
    const sortOrder = this.query?.sortOrder === 'desc' ? '-' : '';

    this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortBy}`);

    return this;
  }

  // paginate() {
  //   const page = Number(this?.query?.page) || 1;
  //   const limit = Number(this?.query?.limit) || 10;
  //   const skip = (page - 1) * limit;

  //   this.modelQuery = this.modelQuery.skip(skip).limit(limit);

  //   return this;
  // }

  // fields() {
  //   const fields =
  //     (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

  //   this.modelQuery = this.modelQuery.select(fields);
  //   return this;
  // }
}

export default QueryBuilder;
