const express = require('express');
const Router = express.Router();
const db = require('../db/');
const formatData = require('../utils/formatData');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
const jsonParser = bodyParser.json();

const ObjectID = require('mongodb').ObjectID;

// /mongodb
//查 传用户权限 查找普通用户
Router.get('/find', async (req, res) => {
    let {
        jurisdiction,
        _id
    } = req.query;
    //判断传入id还是jurisdiction，查找信息
    if (_id) {
        data = await db.find('userList', {
            _id: new ObjectID(_id)
        })
    } else if (jurisdiction) {
        data = await db.find('userList', {
            jurisdiction
        })
    }

    //判断是否查到信息
    if (data.length > 0) {
        res.send(formatData({
            code: 1,
            data,
            msg: '获取数据成功'
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
    var {
        _id
    } = req.body;
    delete req.body._id;
    let data = await db.update('userList', {
        _id: new ObjectID(_id)
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
    let {
        username
    } = req.body
    let findUser = await db.find('userList', {
        username
    });
    if (findUser.length > 0) {
        res.send(formatData({
            code: 0,
            findUser,
            msg: '该用户已存在'
        }))
    } else {
        if (req.body.upw) {
            let data = await db.insert('userList', req.body)
            res.send(formatData({
                code: 1,
                data,
                msg: '用户新增成功'
            }))
        }else{
            res.send(formatData({
                code: 2,
                findUser,
                msg: '该用户可注册'
            }))
        }

    }

})

//单独删除    传用户名 ，删除用户
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

//多选删除    传用户username 用数组保存，删除用户
Router.post('/delAll', jsonParser, urlencodedParser, async (req, res) => {
    let usernames = req.body.usernames.split(',');
    console.log(usernames)
    let data = await db.delete('userList', {
        username: {
            $in: usernames
        }
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