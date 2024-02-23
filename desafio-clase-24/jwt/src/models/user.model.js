import mongoose from 'mongoose';
import leanVirtuals from 'mongoose-lean-virtuals';

const validRoles = ['user', 'admin'];

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  password: { type: String, required: true },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    default: null,
  },
  role: {
    type: String,
    default: 'user',
    // quiero solo permitir "user" o "admin" como role
    validate: {
      validator: function (value) {
        return validRoles.includes(value);
      },
      message: (props) =>
        `${props.value} is not a valid role. Valid roles are: ${validRoles.join(
          ', '
        )}`,
    },
  },
});

userSchema.virtual('id').get(function () {
  return this._id.toString();
});

userSchema.set('toJSON', { virtuals: true });

userSchema.set('toObject', { virtuals: true });

userSchema.plugin(leanVirtuals);

export default mongoose.model('User', userSchema);
