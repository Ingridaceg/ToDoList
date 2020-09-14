const apiVersion = '/api/v1';
const todoEndPoint = '/todo';

export const endPoints = {
  getToDos: () => `${apiVersion}${todoEndPoint}/get-all-todos`,
  createToDo: () => `${apiVersion}${todoEndPoint}/create-todo`,
  updateToDo: () => `${apiVersion}${todoEndPoint}/update-todo`,
  deleteToDo: () => `${apiVersion}${todoEndPoint}/delete-todo`,
};
