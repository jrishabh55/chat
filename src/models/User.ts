import { IDocument, Schema, SchemaTypes, IModel } from 'models';
import db from 'db';

export interface IUser extends IDocument {
  external_id: string;
  blocked: string[];
  photo: string;
  name: string;
}

const userSchema: Schema<IUser> = new Schema({
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  photo: {
    type: SchemaTypes.String,
    required: true,
  },
  external_id: {
    type: SchemaTypes.String,
    required: true,
  },
  blocked: [{
    type: SchemaTypes.ObjectId,
    ref: 'User'
  }]
});

export default db.model('User', userSchema) as IModel<IUser>;
