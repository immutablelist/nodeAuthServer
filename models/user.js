import mongoose from 'mongoose';
import bycrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

// DEFINE our model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});

userSchema.pre('save', function (next) {
  const user = this;

  bycrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    bycrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bycrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

const ModelClass = mongoose.model('user', userSchema);

export default ModelClass;
