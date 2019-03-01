const express = require('express');
const Router = express.Router();
const db = require('../db/');
const formatData = require('../utils/formatData');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
const jsonParser = bodyParser.json();
// /mongodb
//查 传用户权限 查找普通用户
Router.get('/find', async (req, res) => {
    let {
        jurisdiction
    } = req.query;
    console.log({
        jurisdiction
    })
    let data = await db.find('userList', {
        jurisdiction
    })
    if (data.length > 0) {
        res.send(formatData({
            code: 1,
            data
        }))
    } else {
        res.send(formatData({
            code: 0,
            data,
            msg: '没有查到数据'
        }))
    }
})

//改 传id、更改的信息，根据id，修改用户信息
Router.post('/update', jsonParser, urlencodedParser, async (req, res) => {
    let {
        username
    } = req.body;
    let data = await db.update('userList', {
        username
    }, {
        $set: req.body
    })
    if (!data.n) {
        res.send(formatData({
            code: 1,
            data,
            msg: '更新成功'
        }))
    } else {
        res.send(formatData({
            code: 0,
            data,
            msg: '更新失败'
        }))
    }
})

//增  传用户信息，增加到数据库 
Router.post('/add', jsonParser, urlencodedParser, async (req, res) => {
    let data = await db.insert('userList', req.body)
    res.send(formatData({
        code: 1,
        data,
        msg: '新增成功'
    }))
})

//删    传用户id，删除用户
Router.post('/del', jsonParser, urlencodedParser, async (req, res) => {
    let {
        username
    } = req.body;
    let data = await db.delete('userList', {
        username
    })
    if (!data.n) {
        res.send(formatData({
            code: 1,
            data,
            msg: '删除成功'
        }))
    } else {
        res.send(formatData({
            code: 0,
            data,
            msg: '删除失败'
        }))
    }
})
module.exports = Router;