import { Schema } from 'mongoose';
import db from 'db';

interface IUser {
  name: string;
  _id: string;
}

interface IGroup {
  name: string;
  user: IUser[]
}

const groupSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  user: {
    type: Array,
    required: true,
    min: 1
  }
});

export default db.model('Group', groupSchema);
