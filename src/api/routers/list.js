const express = require('express');
const Router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const db = require("../db");

//查询某页  `api/list/page=${page}&qty=${qty}&sort=${sort}&desc=${desc}`
Router.get("/", async function(request, response) {
    // find("goods", {})
    let { page, qty, sort, desc } = request.query;
    // console.log("sort", sort)

    // console.log(page, qty)
    let data = await db.find('goods', {})

    console.log("data", data)
    var data1 = data.sort((a, b) => {
        return a[sort] - b[sort]
        if (desc == 1) {
            // console.log("1sort", a[sort])
            return a[sort] - b[sort]
        } else if (desc == -1) {
            // console.log("-1sort", b)
            return b[sort] - a[sort]
        }
    })
    console.log("data1", data1)
    data1 = data1.slice((page - 1) * qty, qty * page);
    // console.log("data1", data1)

    if (data) {
        response.send({
            code: 1,
            allLength: data.length,
            page,
            qty,
            currLength: data1.length,
            msg: "第" + page + "页商品列表的数据",
            data: data1,
        })
    } else {
        response.send({
            code: 0,
            msg: "查询失败",
        })
    }
})

//删
Router.get("/cancel", async function(request, response) {
    // find("goods", {})
    let { _id } = request.query;
    // console.log("_id", _id)
    // console.log("判断", _id === "5c788ba49965e0979bb771da")
    let data = await db.delete('goods', { _id: new ObjectID(_id) })
        // console.log("id", _id)
    console.log(data.result)
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

module.exports = Router;