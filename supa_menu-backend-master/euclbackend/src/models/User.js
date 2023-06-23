const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JWTService = require('../services/JWTService');

const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    phone: { type: String, default: null },
    resetId: { type: String, default: null },
    role: {
      type: String,
      default: 'Admin',
      enum: ['Admin', 'Owner', 'Member'],
    },
    picture: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', function preSave(next) {
  // assign the current object to plan variable
  const user = this;

  if (user.password === null) return next();

  // only hash the password if it has been modified (or is new)
  if (user.isModified('password') || user.isNew) {
    return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) return next(err);
      // hash the password using our new salt
      return bcrypt.hash(user.password, salt, (hasherr, hash) => {
        if (hasherr) return next(hasherr);
        user.password = hash;
        return next();
      });
    });
  }
  return next();
});

UserSchema.index({ email: 1 });

UserSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.createToken = function () {
  const jwt = new JWTService(this);
  return jwt.create();
};

// export UserSchema as a model
module.exports = mongoose.model('User', UserSchema);
