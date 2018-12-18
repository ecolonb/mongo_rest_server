const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// creando el Schema
const Schema = mongoose.Schema;
// Creating user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name is required!']
  },
  lastname: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: [true, 'The email is reuquired!'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'The password is required!']
  },
  role: {
    type: String,
    default: 'USER',
    enum: {
      values: ['admin_role', 'user_role', 'test_user'],
      message: '{VALUE} no es un role valido!'
    }
  },
  status: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    required: false
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  updated_at: {
    type: Date,
    default: new Date()
  }
});

// Intersertar JSON para borrar password!

// plugin to validate unique data
userSchema.plugin(uniqueValidator, {
  message: 'El valor: [{VALUE}] para el campo [{PATH}] ya existe!'
});

module.exports = mongoose.model('User', userSchema);
