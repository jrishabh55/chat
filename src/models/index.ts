import { Schema, SchemaTypes, Document } from 'mongoose';

export interface IModel extends Document{
  created_at: Date;
  modified_at: Date;
}

export { Schema, SchemaTypes };
