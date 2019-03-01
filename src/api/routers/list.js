const express = require('express');
const Router = express.Router();

const db = require("../db");

//查询某页  `api/list/page=${page}&qty=${qty}&sort=${sort}&desc=${desc}`
Router.get("/", async function(request, response) {
    // find("goods", {})
    let { page, qty, sort, desc } = request.query;
    console.log("sort", sort)
        // console.log(page, qty)
    let data = await db.find('goods', {})
    let data1 = data.slice((page - 1) * qty, qty * page);
    if (data && sort) {
        data1.sort((a, b) => {
            if (desc == 1) {
                return a[sort] - b[sort]
            } else if (desc == -1) {
                return b[sort] - a[sort]
            }

        })
    }
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


module.exports = Router;