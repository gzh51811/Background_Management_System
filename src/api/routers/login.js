const express = require('express');
const Router = express.Router();
const db = require('../db');

Router.get('/', async (req, res) => {
    // console.log(123,req.query);

    let data = await db.find('user',req.query);
    // console.log(456,data);
     
    var res1 = {
        code: 0,
        data: data
    }
    // console.log(res1);
    res.send(res1);
})
module.exports = Router;