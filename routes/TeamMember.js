const express = require("express");
const router = express.Router();
const TeamMember = require("../models/TeamMemberEntity");

router.get("/", async (req, res) => {

    const random = req.query.random
    try {
        const TeamMembers = await TeamMember.find();
        if(!random) res.status(200).send(TeamMembers);
        else res.status(200).send(TeamMembers[0])
    } catch (err) {
        res.status(400).send({ message: err });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const teamMember = await TeamMember.findById(req.params.id);
        teamMember
            .populate(["project", "events", "asignedTask"])
            .exec((err, teamMemberPopulated) => {
                if (err) res.status(400).send({ message: err });
                else res.status(200).send(teamMemberPopulated);
            });
    } catch (err) {
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
