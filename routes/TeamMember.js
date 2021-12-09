const express = require("express");
const router = express.Router();
const cors = require('cors')
const TeamMember = require("../models/TeamMemberEntity");

router.get("/", async (req, res) => {

    const random = req.query.random
    try {
        const TeamMembers = (await TeamMember.find()).map(async x=>{return await x.populate(["project", "events", "asignedTask"])});
        Promise.all(TeamMembers).then(team=>{
            if(!random) res.status(200).send(team);
            else res.status(200).send(team[0])
        })
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: err });
    }
});

router.get("/:id", cors() , async (req, res) => {
    try {
        const requestTeamMember = await TeamMember.findById(req.params.id);
        await requestTeamMember.populate(["project", "events", "asignedTask"]);
        res.status(200).send(requestTeamMember)
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: err });
    }
});



router.post("/", async (req, res) => {
    const newTeamMember = new TeamMember(req.body);
    await newTeamMember
        .save()
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).send({ message: err.message }));
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTeamMember = await TeamMember.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).send(updatedTeamMember);
    } catch (err) {
        res.status(400).send({ message: err });
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await TeamMember.findByIdAndDelete(id);
        res.status(200).send({ message: "TeamMembero eliminado con exito" });
    } catch (err) {
        res.status(400).send({ message: err });
    }
});

module.exports = router;
