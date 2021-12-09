const express = require("express");
const router = express.Router();
const cors = require('cors')
const Project = require("../models/ProjectEntity");

router.get("/", cors(), async (req, res) => {
  try {
    const Projects = (await Project.find()).map(async x=>await x.populate(["tasks", "team"]));
    Promise.all(Projects).then(values=>res.status(200).send(values))
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    project.populate(["tasks", "team"]).exec((err, projectPopulated) => {
      if (err) res.status(400).send({ message: err });
      else res.status(200).send(projectPopulated);
    });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.post("/", async (req, res) => {
  const newProject = new Project(req.body);
  newProject
    .save()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send({ message: err.message }));
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(updatedProject);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Project.findByIdAndDelete(id);
    res.status(200).send({ message: "Projecto eliminado con exito" });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
