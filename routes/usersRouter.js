const express = require('express');
const router = express.Router();
const User = require('../models/user-model'); // Ensure this path is correct

// POST route to create a new user
router.post('/create', async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Create the user with the provided data
        const newUser = await User.create({
            fullname,
            email,
            password
        });

        res.status(201).json({ message: 'User created successfully', newUser });
    } catch (error) {
        res.status(400).json({ error: 'Error creating user', details: error.message });
    }
});

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 22937002df3d09058871462f3b145dba3dab8512
