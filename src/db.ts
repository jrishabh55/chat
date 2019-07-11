import mongoose from 'mongoose';

mongoose.connect('mongodb://user:password123@ds347467.mlab.com:47467/chat', {useNewUrlParser: true});


export default mongoose;
