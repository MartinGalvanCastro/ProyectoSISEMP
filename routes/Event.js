const express = require("express");
const router = express.Router();
const Event = require("../models/EventEntity");

router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        event.populate('participants')
        .exec((err,eventPopulated)=>{
            if (err) res.status(400).json({ message: err })
            else res.status(200).json(eventPopulated)
        })
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

router.post("/", async (req, res) => {
    const event = new Event(req.body);
    try {
        const savedEvent = await event.save();
        res.status(200).json(savedEvent);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json(updatedEvent);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await Event.findByIdAndDelete(id);
        res.status(200).json({ message: "Evento eliminado con exito" });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

module.exports = router