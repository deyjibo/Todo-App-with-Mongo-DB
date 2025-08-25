const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: true, // By default, the task is completed
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FormDataModel = mongoose.model('Todo_list', FormDataSchema);

module.exports = FormDataModel;
