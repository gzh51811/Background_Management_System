/**
 * 操作MongoDB的步骤
 * 1.连接MongoDB：mongodb.MongoClient.connect(url,callback)
 * 2.连接数据库：client.db(DB_NAME)
 * 3.使用集合：db.collection(COLLECTION_NAME)
 * 4.文档操作：CRUD
 * 5.exports.insert/delete/update/find
 */

const mongodb = require('mongodb');
// 创建mongo客户端
const MongoClient = mongodb.MongoClient;
const database_url = 'mongodb://localhost:27017';
const database_name = 'phone';

//如果不写function则MongoClient返回一个promise
async function connect(){
    //返回err,client
   let client = await MongoClient.connect(database_url)
     // 连接数据库，无则自动创建
     let db = client.db(database_name);
    //  console.log(db,client)
    return {db,client}
}


// 增,colName:集合名字，data：数据库查询条件,如果用many，则data为数组
exports.insert = async (colName,data)=>{
    let {db,client} = await connect();
    // console.log('client',client)
    // console.log('db',db)
    //使用某个集合
    let collection = db.collection(colName);
    // 文档操作
    let res = await collection[Array.isArray(data)?'insertMany':'insertOne'](data);
    // 查询结束后，关闭client
    client.close();
    // 返回结果
    return res;
}

//删
exports.delete = async (colName,query)=>{

    let {db,client} = await connect();

    let collection = db.collection(colName);
    let res = await collection['deleteMany'](query);

    client.close();

    return res;
}
//改 update为多条更改，注意选择条件
exports.update = async (colName,query,newData)=>{

    let {db,client} = await connect();

    let collection = db.collection(colName);
    let res = await collection['updateMany'](query,newData);

    client.close();

    return res;
}
//查
exports.find = async (colName,query)=>{

    let {db,client} = await connect();

    let collection = db.collection(colName);
    let res = await collection.find(query).toArray();
    client.close();
    console.log(res)
    // 返回查询结果
    return res;
}