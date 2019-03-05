const express = require('express');
const Router = express.Router();
const db = require('../db');
const {
    create
} = require('../utils/token');

Router.get('/', async (req, res) => {
    let {username}=req.query;
    let data = await db.find('userList', req.query);
    if (data.length > 0) {
        let token = create({
            username
        });
        res.send({
            // data,
            token,
            code: 200
        })

    } else {
        res.send({
            code: 100,
            msg: 'fail'
        })
    }

})
module.exports = Router;