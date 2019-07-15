import { IModel, Schema, SchemaTypes } from 'models';
import db from 'db';

interface IUser {
  id: string;
}

export interface IChat extends IModel {
  name: string;
  users: IUser[];
  created_at: Date;
  modified_at: Date;
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

export default db.model('Chat', chatSchema);
