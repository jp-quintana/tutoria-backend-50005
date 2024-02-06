import mongoose from 'mongoose';
import leanVirtuals from 'mongoose-lean-virtuals';

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  password: { type: String, required: true },
});

userSchema.virtual('id').get(function () {
  return this._id.toString();
});

userSchema.set('toJSON', { virtuals: true });

userSchema.set('toObject', { virtuals: true });

userSchema.plugin(leanVirtuals);

export default mongoose.model('User', userSchema);
