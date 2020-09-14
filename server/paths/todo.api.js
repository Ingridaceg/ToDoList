const ToDoModel = require('../models/toDo.model');

const getAllToDos = callback => {
  ToDoModel.find({}, 'id task completed' ).exec((error, todos)=>{
    if (error){
      callback({ success:false, toDo: null });
    } else {
      callback({ success:true, todos });
    }
  })
};

const insertTask = (toDo, callback) => {
  if(toDo){
    const task = new ToDoModel(toDo);
    task.save((error) => {
      if (error){
        callback({ success:false, toDo });
      } else {
        callback({ success:true, toDo });
      }
    });
  } else {
    callback({ success:false, toDo });
  }
}

const updateTask = (id, completed, callback) => {
  if(id){
    const conditions = {id: id};
    const options = {multi: false};
    ToDoModel.updateOne(conditions, { $set: {completed: completed}}, options, (error) => {
      if (error){
        callback({ success:false, id });
      } else {
        callback({ success:true, id });
      }
    });
    
  } else {
    callback({ success:false, id });
  }
}

const deleteTask = (id, callback) => {
  if(id){
    ToDoModel.deleteOne({id: id}, (error) => {
      if (error){
        callback({ success:false, id });
      } else {
        callback({ success:true, id });
      }
    });
    
  } else {
    callback({ success:false, id });
  }
}

module.exports = {
  getAllToDos,
  insertTask,
  updateTask,
  deleteTask,
}