const mongoose = require('mongoose');
const muv = require('mongoose-unique-validator');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido!'],
    unique: [true, 'El nombre debe ser unico!']
  },
  description: {
    type: String,
    required: false,
    default: '-'
  },
  created_at: {
    type: Date,
    reqired: false,
    default: new Date()
  },
  updated_at: {
    type: Date,
    required: false,
    default: new Date()
  }
});

CategorySchema.plugin(muv, {
  message: 'El valor: [{VALUE}] para el campo [{PATH}] ya existe!'
});

module.exports = mongoose.model('Category', CategorySchema);
