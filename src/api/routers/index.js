
const express = require('express');
const Router = express.Router();
const listRouter = require('./order-list');
const delRouter= require('./del-list');
const loginRouter = require('./login')
//ssss
Router.use('/order-list', listRouter);//查询接口
Router.use('/del-list',delRouter);//删除接口
Router.use('/login',loginRouter);//登录接口

module.exports = Router;