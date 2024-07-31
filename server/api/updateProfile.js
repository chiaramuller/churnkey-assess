const bcrypt = require('bcryptjs');

let users = {}; // This should ideally be a shared datastore

module.exports = (req, res) => {
    const { username, newPassword } = req.body;
    if (!users[username]) {
        return res.status(404).json({ message: 'User not found!' });
    }
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    users[username].password = hashedPassword;
    res.status(200).json({ message: 'Profile updated successfully!' });
};
