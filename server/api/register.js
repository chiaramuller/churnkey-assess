import { hashSync } from 'bcryptjs';
const express = require('express');
const router = express.Router();



let users = {}; // This should ideally be a shared datastore

export default (req, res) => {
    const { username, password } = req.body;
    if (users[username]) { 
        return res.status(400).json({ message: 'Username already exists!' });
    }
    const hashedPassword = hashSync(password, 10);
    users[username] = { username, password: hashedPassword };
    res.status(200).json({ message: 'Registration successful!' });
};
