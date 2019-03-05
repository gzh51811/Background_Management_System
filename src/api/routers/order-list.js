
const express = require('express');
const Router = express.Router();

const db = require('../db');
// const res2 = 
// (async () => {
    // let res = await db.find('phonelist')
    // console.log('res:', res);
// })()
// console.log(res2)
Router.get('/', async (req, res) => {
        let data = await db.find('phonelist')
        // console.log(aaa);
    
        // data.商品总额 =(data.价格 * data.数量)*1;
        // data.订单总额 =(obj.商品总额)*1+ (data.运费)*1;

        // data[0].商品总额 = (data[0].价格 * data[0].数量) * 1;


var arry = [];//往对象数组中添加新属性
data.map(((item, index) => {
        arry.push(Object.assign({}, item, {
            商品总额: item.价格 * item.数量,
            订单总额: (item.价格 * item.数量 ) + (item.运费)*1
        }))
    }))
  


// console.log();



        var res1 = {
            code: 0,
            data: arry
        }
        console.log(res1);
        res.send(res1);
});
module.exports = Router;