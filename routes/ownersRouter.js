const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");

// Render login page for admin (Owner)
router.get("/login", function(req, res) {
    res.render("owner-login");
});

// Owner creation route
router.post("/create", async function(req, res) {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
        return res.status(502).send("You don't have permission to create a new owner");
    }

    let { fullname, email, password } = req.body;
    let createdOwner = await ownerModel.create({ fullname, email, password });
    res.status(201).send(createdOwner);
});

module.exports = router;
