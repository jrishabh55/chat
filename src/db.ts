import mongoose from 'mongoose';
import mongooseTimestamp from 'mongoose-timestamp';
import mongooseFindoneorcreate from 'mongoose-findoneorcreate';

mongoose.connect('mongodb://user:password123@ds347467.mlab.com:47467/chat', {useNewUrlParser: true});

mongoose.plugin(mongooseTimestamp, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

mongoose.plugin(mongooseFindoneorcreate);

export default mongoose;
