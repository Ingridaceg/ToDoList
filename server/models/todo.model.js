const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema(
  {
    id:{
      type: String,
      unique: true,
    },
    task: String,
  },
  {collection: 'tasks'}
);

ToDoSchema.index({
  id: 1,
  task: -1,
});

module.exports = mongoose.model('Tasks', ToDoSchema);
