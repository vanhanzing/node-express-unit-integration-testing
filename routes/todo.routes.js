const express = require('express');
const route = express.Router();
const todoController = require('../controllers/todo.controller');

route.post('/', todoController.createTodo);
route.get('/', todoController.getTodos);
route.get('/:todoId', todoController.getTodoById);
route.put('/:todoId', todoController.updateTodo);
route.delete('/:todoId', todoController.deleteTodo);

module.exports = route;
