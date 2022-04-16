// controllers/user.js

const { JsonWebTokenError } = require('jsonwebtoken');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function signup(req, res) {
    const user = new User({ ...req.body });
    user.save()
        .then(result => {
            res.status(201).json({ message: "User created" });
        })
        .catch(err => res.status(400).json({ err }));
}

function login(req, res) {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "User not found" })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "Incorrect password" });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.JWT_KEY,
                            { expiresIn: "24h" }
                        )
                    });
                    console.log(`${user.email} connected`);  // DEBUG
                })
                .catch(error=> res.status(500).json({ error: error.message }))
        })
        .catch( error => res.status(500).send({ error:error.message }))


} // function login(req, res)

module.exports = { signup, login }