const express = require("express");
const Poll = require("./models/Poll");

const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const { question, options } = req.body;

        const poll = new Poll({
            question,
            options: options.map((text) => ({ text }))
        });

        await poll.save();
        res.status(201).json({ message: "Poll Created", poll });
    } catch (error) {
        res.status(500).json({ message: "Error creating poll", error });
    }
});

module.exports = router;
