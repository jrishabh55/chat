import mongoose, { Schema } from 'mongoose';
import mongooseTimestamp from 'mongoose-timestamp';
import mongooseFindoneorcreate from 'mongoose-findoneorcreate';

mongoose.connect('mongodb://user:password123@ds347467.mlab.com:47467/chat', {useNewUrlParser: true});

mongoose.plugin(mongooseTimestamp, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

mongoose.plugin(mongooseFindoneorcreate);

function mapId (schema: Schema) {
  schema.virtual('id').get(function (this: any) {
    return this._id.toHexString();
  })

  schema.set('toJSON', {
    virtuals: true
  });
}

mongoose.plugin(mapId);

export default mongoose;
