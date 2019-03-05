const express = require('express');
const Router = express.Router();
const {verify} = require('../utils/token');
const db = require('../db/');
Router.get('/',async (req,res)=>{
    var {token} = req.query;
    console.log(token,req.query)
    let data = verify(token);
    let ress = await db.find('userList',{username:data.username});
    console.log('dataz:',data)
    console.log('ress:',ress)

    if(data){

        res.send ({
            status:200, 
            msg:'success',
            ress
        })
    }else{
        res.send ({
            status:302,
            msg:'fail',
            ress
        })
    }
})

module.exports = Router;