const express = require('express');
const Router = express.Router();
const {verify} = require('../utils/token');
const db = require('../db/');
Router.get('/',async (req,res)=>{
    var {token} = req.query;
    let data = verify(token);
    let ress = await db.find('login',{email:data.email});
    console.log('dataz:',data)
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