const express = require('express');
const Router = express.Router();
const db = require('../db');
const ObjectID = require('mongodb').ObjectID;

// (async () => {
// let res = await db.delete('phonelist',{商品名称:'小米14'})
// console.log('res:', res);
// })()


Router.get('/', async (req, res) => {
     let data3 = req.query
     console.log("aaaaa",data3);
    let data = await db.delete('phonelist',{_id:new ObjectID(data3._id)})
    // console.log(data);
    var res1 = {
        code: 0,
        data: data
    }
    // console.log(res1);
    res.send(res1);
});
module.exports = Router;




