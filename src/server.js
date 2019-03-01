const express = require('express');
const app = express();
const Router = require('./api/routers');
// 静态服务器
app.use(express.static('./public'));
// 路由接口,主路由
<<<<<<< HEAD
app.use('/api', Router);
app.listen(1811, () => {
=======
app.use('/api',Router);

app.listen(1811,()=>{
>>>>>>> 4f3c5829119bd828adac9bc33d7764596d5808f3
    console.log('server is running on http://localhost:1811');
});