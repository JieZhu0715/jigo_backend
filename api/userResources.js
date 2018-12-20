const express = require("express");
const userResources = express.Router();
const UserDao = require("../dao/userDao")
const { MD5_SUFFIX, responseClient, md5 } = require('../utils/crypto')
const User = require('../schema/user')

const userDao = new UserDao()

userResources.post('/login', (req, res) => {
    let { password, email } = req.body;
	if (!email) {
		responseClient(res, 400, 2, '用户邮箱不可为空');
		return;
	}
	if (!password) {
		responseClient(res, 400, 2, '密码不可为空');
        return;
    }
    
    userDao.findOne({ email, password: md5(password + MD5_SUFFIX),}).then(
        userInfo => {
            if (userInfo) 
            {
                req.session.userInfo = userInfo;
				responseClient(res, 200, 0, '登录成功', userInfo);
            }
            else{
                responseClient(res, 400, 1, '用户名或者密码错误');
            }
        }
    ).catch(error => {
        responseClient(res);
    })
})

userResources.post('/rigister', (req, res) => {
    let { name, password, email, introduce, type } = req.body;
	if (!email) {
		responseClient(res, 400, 2, '用户邮箱不可为空');
		return;
	}
	if (!name) {
		responseClient(res, 400, 2, '用户名不可为空');
		return;
	}
	if (!password) {
		responseClient(res, 400, 2, '密码不可为空');
        return;
    }
    
    userDao.findOne({ email: email }).then(
        data => {
            if (data) 
            {
                responseClient(res, 200, 1, '用户邮箱已存在！');
				return;
            }
            let user = new User({
                email,
				name,
				password: md5(password + MD5_SUFFIX),
				type,
				introduce,
            }); 
            userDao.create(user).then(
                data => {
                    responseClient(res, 200, 0, 'Successful', data);
                    return;
                }
            )
        }
    ).catch(error => {
        responseClient(res);
        return;
    })
})
  
userResources.all('*', function(req, res, next){
    next();
  })
  
module.exports = userResources;