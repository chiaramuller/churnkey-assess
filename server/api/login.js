const bcrypt = require('bcryptjs');

let users = {}; // This should ideally be a shared datastore

module.exports = (req, res) => {
    const { username, password } = req.body;
    const user = users[username];
    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        return res.status(200).json({ message: 'Login successful!' });
    }
    res.status(401).json({ message: 'Invalid username or password!' });
};
