import { IModel, Schema, SchemaTypes } from 'models';
import db from 'db';

export interface IMessage extends IModel {
  msg: string;
  user_id: string;
}

const messageSchema: Schema = new Schema({
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

export default db.model('Message', messageSchema);
