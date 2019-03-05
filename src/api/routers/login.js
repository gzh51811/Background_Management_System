const express = require('express');
const Router = express.Router();
const db = require('../db');
const {
    create
} = require('../utils/token');

Router.get('/', async (req, res) => {
    // console.log(123,req.query);
    let {username}=req.query;
    let data = await db.find('userList', req.query);
    // console.log(456,data);
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

    // console.log(res1);
})
module.exports = Router;