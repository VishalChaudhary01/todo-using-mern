const { Todo, schema } = require("../models/Todo");
const joi = require("joi");

const handleGetTodo = async (req, res) => {
     const todos = await Todo.find({});
     return res.json(todos);
}

const handleGetTodoById = async (req, res) => {
     const todo = await Todo.findById(req.params.id);
     if (!todo) return res.status(400).json({ msg: "Todo not found"});
     res.json(todo);
}

const handleCreateTodo = async (req, res) => {
     const { title, description, completed } = req.body;
     const result = schema.validate(req.body);
     if (result.error) return res.json({ msg: result.error.details[0].message});
     const newTodo = await Todo.create({
          title,
          description,
          completed,
     });
     res.json({ msg: "Created Todo", newTodo });
}

const handleUpdateTodo = async (req, res) => {
     const todo = await Todo.findById(req.params.id);
     if (!todo) return res.json({ msg: "Todo with given id not found"});
     await Todo.findByIdAndUpdate(req.params.id, req.body);
     res.json({ msg: "Todo Updated" });
};

const handleDeleteTodo = async (req, res) => {
     const todo = await Todo.findById(req.params.id);
     if (!todo) return res.json({ msg: "Todo with given id not found" });
     await Todo.findByIdAndDelete(req.params.id);
     res.json({ msg: "Deleted Todo", todo })
}

module.exports = {
     handleGetTodo,
     handleGetTodoById,
     handleCreateTodo,
     handleDeleteTodo,
     handleUpdateTodo
}