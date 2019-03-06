const express = require('express');
const mongodb = require("mongodb");
const Router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const db = require("../db");
const MongoClient = mongodb.MongoClient;
const bodyParser = require("body-parser");
let urlencoded = bodyParser.urlencoded({ extended: false });

//查询某页  `api/list/page=${page}&qty=${qty}&sort=${sort}&desc=${desc}`
// Router.get("/", async function(request, response) {
//     // find("goods", {})
//     let { page, qty, sort, desc, mohu, shopName, classify } = request.query;
//     // console.log(shopName, classify)

//     // console.log(page, qty)
//     //{"name": {$regex: 'mi', $options:'i'},'classify':"iphone"}
//     let data = mohu ? await db.find('goods', { name: { $regex: shopName, $options: 'i' }, classify }) : await db.find('goods', {})
//         // console.log("data", data)

//     var data1 = data.sort((a, b) => {
//           
//             if (desc == 1) {
//                 // console.log("1sort", a[sort])
//                 return a[sort] - b[sort]
//             } else if (desc == -1) {
//                 // console.log("-1sort", b)
//                 return b[sort] - a[sort]
//             }
//         })
//         // console.log("data1", data1)
//     data1 = data1.slice((page - 1) * qty, qty * page);
//     // console.log("data1", data1)
//     //console.log('data1', data1)
//     if (data) {
//         response.send({
//             code: 1,
//             allLength: data.length,
//             page,
//             qty,
//             currLength: data1.length,
//             msg: "第" + page + "页商品列表的数据",
//             data: data1,
//         })
//     } else {
//         response.send({
//             code: 0,
//             msg: "查询失败",
//         })
//     }
// })


Router.get('/', urlencoded, (req, res) => {
    // console.log("req.body",req.body);
    let { page, qty, sort, desc, mohu, shopName, classify } = req.query;
    // console.log(shopName)
    var obj = {}
    obj[sort] = desc * 1; //键名代表排序方式,键值代表升序(1)或是降序(-1);
    //console.log(obj);
    MongoClient.connect('mongodb://localhost:27017', (err, database) => {
        //连接成功后执行这个回调函数
        if (err) throw err;

        // 使用某个数据库，无则自动创建
        let shujuku = database.db('BMS');

        // 使用集合
        let user = shujuku.collection('goods');
        // console.log({ classify, "name": { $regex: shopName, $options: 'i' } })
        // 模糊查询商品
        // console.log(desc, typeof(desc * 1))
        if (mohu == "mohu") {
            // console.log(1111)
            user.find().skip((page - 1) * qty).limit(qty * 1).sort(obj).toArray(async(err, result) => {
                let arr = await db.find('goods', { name: { $regex: shopName, $options: 'i' }, classify, });
                var data1 = arr.sort((a, b) => {

                        if (desc * 1 === 1) {
                            // console.log("1sort")
                            return a[sort] - b[sort]
                        } else if (desc * 1 === -1) {
                            // console.log("-1sort")
                            return b[sort] - a[sort]
                        }
                    })
                    // console.log("data1", data1)
                data1 = data1.slice((page - 1) * qty, qty * page);

                if (result) {
                    res.send({
                        code: 1,
                        allLength: arr.length,
                        page,
                        qty,
                        currLength: result.length,
                        msg: "第" + page + "页商品列表的数据",
                        data: data1,
                    })
                } else {
                    res.send({
                        code: 1,
                        data: result,
                        msg: `查询错误第${page}页商品列表数据出错`
                    })
                }
                // console.log(result, result.length, )
            });
        } else {
            // console.log(222)
            user.find().skip((page - 1) * qty).limit(qty * 1).sort(obj).toArray(async(err, result) => {
                let arr = await db.find('goods', {});

                if (result) {
                    res.send({
                        code: 1,
                        allLength: arr.length,
                        page,
                        qty,
                        currLength: result.length,
                        msg: "第" + page + "页商品列表的数据",
                        data: result,
                    })
                } else {
                    res.send({
                        code: 1,
                        data: result,
                        msg: `查询错误第${page}页商品列表数据出错`
                    })
                }
                // console.log(result, result.length, )
            });

        }

        // 关闭数据库，避免资源浪费
        database.close();

    });
});



//查询单条
Router.get("/one", async function(request, response) {
    // find("goods", {})
    let { _id } = request.query;
    // console.log(shopName, classify)

    // console.log(page, qty)
    //{"name": {$regex: 'mi', $options:'i'},'classify':"iphone"}
    let data = await db.find('goods', { _id: new ObjectID(_id) })
        // console.log("data", data)

    if (data) {
        response.send({
            code: 1,
            data: data[0],
            msg: "查询_id为" + _id + "的数据",
        })
    } else {
        response.send({
            code: 0,
            msg: "查询失败",
        })
    }
})

//删单条
Router.get("/cancel", async function(request, response) {
    // find("goods", {})
    let { _id } = request.query;
    // console.log("_id", _id)
    // console.log("判断", _id === "5c788ba49965e0979bb771da")
    let data = await db.delete('goods', { _id: new ObjectID(_id) })
        // console.log("id", _id)
        // console.log(data.result)
    if (data.result.n == 1 && data.result.ok == 1) {
        response.send({
            msg: "删除成功",
            code: 1,
        })
    } else {
        response.send({
            msg: "删除失败",
            code: 0,
        })
    }
})

// 删多条
Router.get("/cancelMany", async function(request, response) {
        // find("goods", {})
        let { _id } = request.query;
        // console.log(_id)
        let arr = JSON.parse(_id);
        let arr2 = [];
        for (var a = 0; a < arr.length; a++) {
            var id = arr[a]
            let data = await db.delete('goods', { _id: new ObjectID(id) })
                // console.log(data.result.n, data.result.ok)
            if (data.result.n == 1 && data.result.ok == 1) {
                arr2.push(true)
            } else {
                arr2.push(false)
            }

        }
        var iftrue = arr2.every(item => {
            return item == true
        })
        if (iftrue) {
            response.send({
                msg: "删除成功",
                code: 1,
            })
        } else {
            response.send({
                msg: "删除失败",
                code: 0,
            })
        }
    })
    //更新
Router.get("/update", async function(request, response) {
    let { _id, state, name, title, price, sale, inventory, classify } = request.query;
    //console.log(typeof name)
    // console.log(_id)
    // if (name) {
    //     console.log(111)
    // }
    // console.log(_id, state, name, title, price, sale, inventory, classify)
    let obj = name === undefined ? { $set: { state } } : { $set: { state, name, title, price, sale, inventory, classify } };
    // console.log(obj)

    let data = await db.update('goods', { _id: new ObjectID(_id) }, obj)
        // console.log(data.result)

    if (data.result.n == 1 && data.result.ok == 1) {
        response.send({
            msg: "更新成功",
            code: 1,
        })
    } else {
        response.send({
            msg: "更新失败",
            code: 0,
        })
    }


})



// 增
Router.get("/insert", async function(request, response) {

    let { state, name, title, price, sale, inventory, classify } = request.query;
    //console.log(typeof name)
    // console.log(_id)
    // if (name) {
    //     console.log(111)
    // }
    // console.log(state, name, title, price, sale, inventory, classify)

    // console.log(obj)

    let data = await db.insert('goods', { state, name, title, price, sale, inventory, classify, time: (new Date()).toLocaleDateString(), })
        // console.log((new Date()).toUTCString())

    if (data.result.n == 1 && data.result.ok == 1) {
        response.send({
            msg: "加入成功",
            code: 1,
        })
    } else {
        response.send({
            msg: "加入失败",
            code: 0,
        })
    }


})

module.exports = Router;