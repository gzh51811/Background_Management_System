const express = require('express');
const Router = express.Router();
// 引入分支路由
// const loginRouter = require('./login');
// const registerRouter = require('./register');
const listRouter = require('./list');
const userlistRouter = require('./userList');
const listRouter = require('./order-list');
const delRouter = require('./del-list');
const loginRouter = require('./login')
//设置分支路由
// Router.use('/login',loginRouter);
// Router.use('/register',registerRouter);
Router.use('/list', listRouter);
Router.use('/userList', userlistRouter);
//ssss
Router.use('/order-list', listRouter); //查询接口
Router.use('/del-list', delRouter); //删除接口
Router.use('/login', loginRouter); //登录接口

module.exports = Router;