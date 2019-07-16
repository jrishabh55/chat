import { Schema, SchemaTypes, Document, Model } from 'mongoose';

export interface IDocument extends Document {
  created_at: Date;
  modified_at: Date;
}

export interface IModel<T> extends Model<IDocument> {
  findOneOrCreate(condition: object, data: T): T;
}

export { Schema, SchemaTypes };
