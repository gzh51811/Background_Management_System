
const express = require('express');
const Router = express.Router();
const listRouter = require('./order-list');
const delRouter= require('./del-list');

Router.use('/order-list', listRouter);//查询接口
Router.use('/del-list',delRouter);//删除接口

module.exports = Router;