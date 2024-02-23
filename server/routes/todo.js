const express = require("express");
const router = express.Router();
const Todo = require("../model/todoModel");

let todoList = require("../toDoList.json");

router.get("/", async (req, res) => {
  if (req.query?.search?.length > 1) {
    //console.log(req.query);

    try {
      const { search } = req.query;
      console.log("🚀 + router.get + search:", search);

      const result = await Todo.find({
        text: {
          $regex: search,
          $options: "i",
        },
      });
      res.status(200).json({ message: "filtered todo", data: result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const result = await Todo.find({});
      res.status(200).json({ message: "Success", data: result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});
router.delete("/", async (req, res) => {
  try {
    const { toDoId } = req.query;
    if (toDoId) {
      console.log("🚀 + router.delete + toDoId:", toDoId);
      await Todo.findByIdAndDelete(toDoId);
      const result = await Todo.find({});
      res
        .status(200)
        .json({ message: "todo deleted successfully", data: result });
    } else {
      res.status(404).json({ message: "item not exist" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

  // let filteredArray = todoList.filter((data) => data.id != toDoId);
  // todoList = filteredArray;
});

router.post("/", async (req, res) => {
  try {
    const { toDo } = req.body;
    console.log("🚀 + router.post + toDo:", toDo);

    const newTodo = {
      text: toDo,
      completed: false,
    };

    //todoList.push(newTodo);
    await Todo.create(newTodo);
    const result = await Todo.find({});
    res.status(200).json({ message: "Todo added", data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const { _id, text, completed } = req.body.data;

    //const editedTodo = todoList.find((res) => res.id == data.id);
    // editedTodo.text = data.text;
    // editedTodo.completed = data.completed;
    const editedTodo = {
      text: text,
      completed: completed,
    };
    //console.log("🚀 + router.put + editedTodo:", editedTodo);

    const result = await Todo.findByIdAndUpdate(_id, editedTodo, { new: true });

    if (editedTodo) {
      res
        .status(200)
        .json({ message: "todo updated successfully", data: result });
    } else {
      res
        .status(404)
        .json({ message: `Item with ID:${data.id} does not exist` });
    }
    //console.log(editedTodo, "editedTodo");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
