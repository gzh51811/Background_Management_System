const express = require('express');
const Router = express.Router();
// 引入分支路由
// const loginRouter = require('./login');
// const registerRouter = require('./register');
const listRouter = require('./list');
const classifyRouter = require('./classify');
const userlistRouter = require('./userList');

//设置分支路由
// Router.use('/login',loginRouter);
// Router.use('/register',registerRouter);
Router.use('/list', listRouter);
Router.use('/classifyList', classifyRouter);
Router.use('/userList', userlistRouter);

module.exports = Router;