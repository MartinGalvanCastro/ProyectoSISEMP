const express = require('express');
const router = express.Router();
const Task = require('../models/TaskEntity');

router.get('/', async (req, res) => {
    try {
        const Tasks = await Task.find();
        res.status(200).json(Tasks);
    } catch (err) {
        res.status(400).json({ message: err });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const task = await Project.findById(req.params.id);
        task.populate(['project','asignedTo'])
        .exec((err,taskPopulated)=>{
            if (err) res.status(400).json({ message: err })
            else res.status(200).json(taskPopulated)
        })
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const Task = new Task(req.body);
    try {
        const savedTask = await Task.save();
        res.status(200).json(savedTask)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updatedTask)
    } catch (err) {
        res.status(400).json({message:err})
    }
})

router.delete('/:id', async(req,res)=>{
    const id = req.params.id
    try{
        await Task.findByIdAndDelete(id)
        res.status(200).json({message:'Tasko eliminado con exito'})
    } catch (err){
        res.status(400).json({message:err})
    }
})