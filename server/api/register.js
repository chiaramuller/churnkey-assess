const bcrypt = require('bcryptjs');

let users = {}; // This should ideally be a shared datastore

module.exports = (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.status(400).json({ message: 'Username already exists!' });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    users[username] = { username, password: hashedPassword };
    res.status(200).json({ message: 'Registration successful!' });
};
