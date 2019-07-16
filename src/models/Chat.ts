import { IDocument, Schema, SchemaTypes, IModel } from 'models';
import db from 'db';

interface IUser {
  id: string;
}

export interface IChat extends IDocument {
  name: string;
  users: IUser[];
}

const chatSchema: Schema = new Schema({
  name: {
    type: SchemaTypes.String,
    required: true,
    minlength: 5,
  },
  user_id: [{
    type: SchemaTypes.ObjectId,
    ref: 'User'
  }]
});

export default db.model('Chat', chatSchema) as IModel<IChat>;
