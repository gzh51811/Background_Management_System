const express = require('express');
const Router = express.Router();
// 引入分支路由
const loginRouter = require('./login');
const registerRouter = require('./register');
const listRouter = require('./list');

//设置分支路由
Router.use('/login',loginRouter);
Router.use('/register',registerRouter);
Router.use('/list',listRouter);

module.exports = Router;