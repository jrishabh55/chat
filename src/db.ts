import mongoose from 'mongoose';
import mongooseTimestamp from 'mongoose-timestamp';

mongoose.connect('mongodb://user:password123@ds347467.mlab.com:47467/chat', {useNewUrlParser: true});

mongoose.plugin(mongooseTimestamp, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default mongoose;
