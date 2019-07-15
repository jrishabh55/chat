import { IModel, Schema, SchemaTypes } from 'models';
import db from 'db';

export interface IMessage extends IModel {
  external_id: string;
  blocked: string[];
}

const userSchema: Schema = new Schema({
  external_id: {
    type: SchemaTypes.String,
    required: true,
  },
  blocked: [{
    type: SchemaTypes.ObjectId,
    ref: 'User'
  }]
});

export default db.model('User', userSchema);
