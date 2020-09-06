const ToDoModel = require('../models/todo.model');

const getAllToDos = callback => {
    ToDoModel.find({}, 'id task' ).exec((error, todos)=>{
      if (error){
        callback({ success:false, todo: null });
      } else {
        callback({ success:true, todos });
      }
    })
};

module.exports = {
  getAllToDos,
}