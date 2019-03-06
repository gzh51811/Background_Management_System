const express = require('express');
const Router = express.Router();
const db = require('../db');
const ObjectID = require('mongodb').ObjectID;




Router.get('/', async (req, res) => {
     let data3 = req.query
    let data = await db.delete('phonelist',{_id:new ObjectID(data3._id)})
    var res1 = {
        code: 0,
        data: data
    }
    res.send(res1);
});
module.exports = Router;




