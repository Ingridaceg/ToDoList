const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema(
  {
    id:{
      type: String,
      unique: true,
      required: true,
    },
    task:{
      type: String,
      required: true,
    },
    completed: Boolean
  },
  {collection: 'tasks'}
);

ToDoSchema.index({
  id: 1,
  task: -1,
});

module.exports = mongoose.model('Tasks', ToDoSchema);
