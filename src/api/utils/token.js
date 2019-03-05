const jwt = require('jsonwebtoken');
// privateKey：用于加密的私钥
let privateKey = 'zhangzhian';
//封装函数，设置加密信息，用对象保存，expiresIn为加密
// 生成token
exports.create = (obj, expiresIn = '7 days') => {
    // obj: 用于加密的信息
    // expiresIn: token有效期(单位: s)，默认2小时
    // privateKey：用于加密的私钥
    let token = jwt.sign(obj, privateKey, {
        expiresIn
    });
    return token;
}

// 验证token
/**
 * 1.传token
 * 2.尝试验证，如果验证失败则返回false，成功则返回结果
 */
exports.verify = (token) => {
    var res = false;
    try {
        res = jwt.verify(token, privateKey);
    } catch (err) {
        res = false;
    }
    return res;
}