const express = require('express');
const app = express();
const Router = require('./api/routers');
// 静态服务器
app.use(express.static('./public'));
// 路由接口,主路由
app.use('/api', Router);
app.listen(1811, () => {
    console.log('server is running on http://localhost:1811');
});