const TodoModel = require('../model/todo.model');

exports.createTodo = async (req, res, next) => {
  try {
    const createTodo = await TodoModel.create(req.body);
    res.status(201).json(createTodo);
  } catch (err) {
    next(err);
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    const allTodos = await TodoModel.find({});
    res.status(200).json(allTodos);
  } catch (err) {
    next(err);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const todo = await TodoModel.findById(req.params.todoId);
    if (todo) {
      return res.status(200).json(todo);
    }
    return res.status(404).json({ message: 'Todo not found!' });
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const todo = await TodoModel.findByIdAndUpdate(
      req.params.todoId,
      req.body,
      { new: true, useFindAndModify: false }
    );
    if (todo) {
      return res.status(200).json(todo);
    }
    return res.status(404).json({ message: 'Todo not found!' });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await TodoModel.findByIdAndDelete(req.params.todoId);
    if (todo) {
      return res.status(200).json(todo);
    }
    return res.status(404).json({ message: 'Todo not found!' });
  } catch (err) {
    next(err);
  }
};
