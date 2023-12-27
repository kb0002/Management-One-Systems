// Import necessary modules
const express = require('express');
const router = express.Router();
const AdminUser = require('../models/AdminUser');

// Get all admin users
router.get('/', async (req, res) => {
  try {
    const adminUsers = await AdminUser.find();
    res.json(adminUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific admin user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const adminUser = await AdminUser.findById(id);

    if (!adminUser) {
      return res.status(404).json({ error: 'Admin User not found' });
    }

    res.json(adminUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new admin user
router.post('/', async (req, res) => {
  const { username, name, password, email, contactNumber } = req.body;

  try {
    const newAdminUser = new AdminUser({
      username,
      name,
      password,
      email,
      contactNumber,
    });
    await newAdminUser.save();
    res.status(201).json(newAdminUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an admin user by ID
router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const adminUser = await AdminUser.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!adminUser) {
      return res.status(404).json({ error: 'Admin User not found' });
    }

    res.json(adminUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an admin user by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const adminUser = await AdminUser.findByIdAndDelete(id);

    if (!adminUser) {
      return res.status(404).json({ error: 'Admin User not found' });
    }

    res.json(adminUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
