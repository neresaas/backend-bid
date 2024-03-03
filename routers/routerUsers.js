let express = require('express');
let routerUsers = express.Router();
let users = require('../data/users');
let jwt = require('jsonwebtoken');

routerUsers.post('/login', (req, res) => {
    let email = req.body.email
    let password = req.body.password

    if (email == undefined) {
        res.status(400).json({error: 'not email'})
        return
    }

    if (password == undefined) {
        res.status(400).json({error: 'not password'})
        return
    }

    let user = users.find(u => u.email == email && u.password == password)

    if (user == undefined) {
        res.status(401).json({error: 'not valid user or password'})
        return
    }

    let apiKey = jwt.sign(
        {
            email: user.email,
            id: user.id
        },
        'secret'
    )

    res.json({apiKey: apiKey})
});

module.exports = routerUsers;