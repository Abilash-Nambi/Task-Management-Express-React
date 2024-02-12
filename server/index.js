const express = require("express");
const cors = require("cors");
const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors());

let todoList = require("./toDoList.json");

app.get("/todo", (req, res) => {
  if (req.query?.search?.length > 1) {
    console.log(req.query);
    const { search } = req.query;
    let filteredArray = todoList.filter((data) =>
      data.text.toLowerCase().includes(search.toLowerCase())
    );
    return res.json({ message: "Success", data: filteredArray });
  } else {
    return res.json({ message: "Success", data: todoList });
  }
});
app.delete("/todo", (req, res) => {
  const { toDoId } = req.query;

  let filteredArray = todoList.filter((data) => data.id != toDoId);
  todoList = filteredArray;
  res.json({ message: "Success", data: todoList });
});

app.post("/todo", (req, res) => {
  const { data } = req.body;
  console.log(data, "req");
  todoList.push(data);
  res.json({ message: "Success", data: todoList });
});

app.put("/todo", (req, res) => {
  const { data } = req.body;

  const editedTodo = todoList.find((res) => res.id == data.id);
  //console.log(editedTodo, "editedTodo");
  editedTodo.text = data.text;
  editedTodo.completed = data.completed;
  res.json({ message: "Success", data: todoList });
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
