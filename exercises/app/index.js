const express = require("express");
const morgan = require("morgan");
//const connect = require("../connect");
const { json, urlencoded } = require("body-parser");
const app = express();
const Todo = require("./todo");
const mongoose = require("mongoose");

app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/todo/:id", async (req, res) => {
  const todoId = req.params.id;
  try {
    const todo = await Todo.findById(todoId).lean().exec();
    res.status(200).json(todo);
  } catch (e) {
    res.status(500).json("500 /toto/:id get");
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todo = await Todo.find({}).lean().exec();
    res.status(200).json(todo);
  } catch (e) {
    res.status(500).json("500 /todos get");
  }
});

app.post("/todo", async (req, res) => {
  const todoToCreate = req.body.todo;
  try {
    const todo = await Todo.create({ todoToCreate }).exec();
    res.status(201).json(todo.toJSON());
  } catch (e) {
    res.status(500).json("500 /todo post");
  }
});

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/whatever");
};

connect(/**add mongo url here */)
  .then(() =>
    app.listen(4000, () => {
      console.log("server on http://localhost:4000");
    })
  )
  .catch((e) => console.error(e));
