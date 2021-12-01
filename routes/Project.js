const express = require('express');
const router = express.Router();
const Project = require('../models/ProjectEntity');

router.get('/', async (req, res) => {
    try {
        const Projects = await Project.find();
        res.status(200).json(Projects);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        project.populate(['tasks','team'])
        .exec((err,projectPopulated)=>{
            if (err) res.status(400).json({ message: err })
            else res.status(200).json(projectPopulated)
        })
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const Project = new Project(req.body);
    try {
        const savedProject = await Project.save();
        res.status(200).json(savedProject);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedProject);
    } catch (err) {
        res.status(400).json({message:err});
    }
});

router.delete('/:id', async(req,res)=>{
    const id = req.params.id
    try{
        await Project.findByIdAndDelete(id);
        res.status(200).json({message:'Projecto eliminado con exito'});
    } catch (err){
        res.status(400).json({message:err});
    }
});