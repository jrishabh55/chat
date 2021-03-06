import { IDocument, Schema, SchemaTypes, IModel } from 'models';
import db from 'db';

export interface IMessage extends IDocument {
  message: string;
  user_id: string;
}

const messageSchema: Schema = new Schema({
  message: {
    type: SchemaTypes.String,
    required: true,
    minlength: 5,
  },
  user_id: {
    type: SchemaTypes.ObjectId,
    ref: 'User'
  }
});

const model = db.model('Message', messageSchema) as IModel<IMessage>;

export default model;
