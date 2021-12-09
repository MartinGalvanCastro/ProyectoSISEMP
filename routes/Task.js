const express = require("express");
const router = express.Router();
const cors = require('cors')
const Task = require("../models/TaskEntity");
const { Compressor } = require("mongoose/node_modules/mongodb");

router.get("/", cors(), async (req, res) => {
  try {
    const Tasks = (await Task.find()).map(
      async (x) => await x.populate(["project", "asignedTo"])
    );
    Promise.all(Tasks).then(values=>res.status(200).send(values))
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await Project.findById(req.params.id);
    await task.populate(["project", "asignedTo"]);
    res.status(200).send(taskPopulated);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.post("/", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask
    .save()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send({ message: err.message }));
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(updatedTask);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Task.findByIdAndDelete(id);
    res.status(200).send({ message: "Tasko eliminado con exito" });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
