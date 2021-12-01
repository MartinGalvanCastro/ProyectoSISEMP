const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMemberEntity');

router.get('/', async (req, res) => {
    try {
        const TeamMembers = await TeamMember.find();
        res.status(200).json(TeamMembers);
    } catch (err) {
        res.status(400).json({ message: err });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const teamMember = await Project.findById(req.params.id);
        teamMember.populate(['project','events','asignedTask'])
        .exec((err,teamMemberPopulated)=>{
            if (err) res.status(400).json({ message: err })
            else res.status(200).json(teamMemberPopulated)
        })
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const TeamMember = new TeamMember(req.body);
    try {
        const savedTeamMember = await TeamMember.save();
        res.status(200).json(savedTeamMember)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const updatedTeamMember = await TeamMember.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updatedTeamMember)
    } catch (err) {
        res.status(400).json({message:err})
    }
})

router.delete('/:id', async(req,res)=>{
    const id = req.params.id
    try{
        await TeamMember.findByIdAndDelete(id)
        res.status(200).json({message:'TeamMembero eliminado con exito'})
    } catch (err){
        res.status(400).json({message:err})
    }
})