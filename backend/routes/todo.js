const express = require("express");
const { handleCreateTodo, handleGetTodo, handleGetTodoById, handleDeleteTodo, handleUpdateTodo } = require("../controller/todo");
const router = express.Router();


router.get("/", handleGetTodo);
router.get("/:id", handleGetTodoById);

router.post("/", handleCreateTodo);
router.put("/:id", handleUpdateTodo);
router.delete("/:id", handleDeleteTodo);


module.exports = router;