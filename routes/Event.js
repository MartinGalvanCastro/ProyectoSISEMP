const express = require("express");
const router = express.Router();
const Event = require("../models/EventEntity");

router.get("/", async (req, res) => {
  try {
    const events = (await Event.find()).map(async x=> await x.populate("participants"));
    Promise.all(events).then(values=>res.status(200).send(values))
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    event.populate("participants").exec((err, eventPopulated) => {
      if (err) res.status(400).send({ message: err });
      else res.status(200).send(eventPopulated);
    });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.post("/", async (req, res) => {
  const newEvent = new Event(req.body);
    await newEvent
    .save()
    .then((data) => res.status(200).send(data))
    .catch((err) =>{ console.log(err) ; res.status(400).send({ message: err.message })});
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(updatedEvent);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Event.findByIdAndDelete(id);
    res.status(200).send({ message: "Evento eliminado con exito" });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
