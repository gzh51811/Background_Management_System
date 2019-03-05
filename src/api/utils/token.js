const jst = require('jsonwebtoken');

let privatekey = 'yonghu';


//生成token
exports.create = (username, expiresIn = '7 days') => {
    let token = jst.sign({
        username
    }, privatekey, {
        expiresIn
    });
    return token;
}




//验证token
exports.verify = (token) => {
    let res = false;
    try {
        res = jst.verify(token, privatekey);
    } catch (err) {
        res = false;
    }
    return res;



}