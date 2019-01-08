const express = require("express");
const userResources = express.Router();
const UserDao = require("../dao/userDao")
const { MD5_SUFFIX, responseClient, md5 } = require('../utils/crypto')
const User = require('../schema/user')

const userDao = new UserDao()

userResources.post('/currentUser', (req, res) => {
    let { password, email } = req.body;
	if (!email) {
		responseClient(res, 400, 2, '用户邮箱不可为空', req);
		return;
	}
	if (!password) {
		responseClient(res, 400, 2, '密码不可为空', req);
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
        console.log(error)
        responseClient(res);
    })
})

userResources.post('/authorizeUser', (req, res) => {
    let { _id } = req.body;
    if ( !_id )
    {
        responseClient(res, 400, 2, '_id is null', req);
		return; 
    }
    userDao.findOne({ _id }).then(
        userInfo => {
            if (userInfo) 
            {   
                userInfo.user_type = 1;
                userDao.save(userInfo)
                .then(userInfo => {
                    if (userInfo)
                    {
                        responseClient(res, 200, 0, '', userInfo);
                    }
                    else
                    {
                        responseClient(res, 400, 1, 'Failed to authorize user'); 
                    }
                })
                .catch(error => {
                    responseClient(res); 
                })
				responseClient(res, 200, 0, '', userInfo);
            }
            else{
                responseClient(res, 400, 1, 'No user found');
            }
        }
    ).catch(error => {
        responseClient(res);
    })
})

userResources.get('/findUser', (req, res) => {
    let { _id } = req.query; 
    if ( !_id )
    {
        responseClient(res, 400, 2, '_id is null', req);
		return; 
    }
    userDao.findOne({ _id }).then(
        userInfo => {
            if (userInfo) 
            {
				responseClient(res, 200, 0, '', userInfo);
            }
            else{
                responseClient(res, 400, 1, 'No user found');
            }
        }
    ).catch(error => {
        responseClient(res);
    })
})

userResources.post('/login', (req, res) => {
    let { password, email } = req.body;
	if (!email) {
		responseClient(res, 400, 2, '用户邮箱不可为空', req);
		return;
	}
	if (!password) {
		responseClient(res, 400, 2, '密码不可为空', req);
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

userResources.post('/logout', (req, res) => {
    if (req.session.userInfo) {
		req.session.userInfo = null; // delte session
		responseClient(res, 200, 0, '登出成功！！');
	} else {
		responseClient(res, 200, 1, '您还没登录！！！');
	} 
})

exports.logout = (req, res) => {
	if (req.session.userInfo) {
		req.session.userInfo = null; // 删除session
		responseClient(res, 200, 0, '登出成功！！');
	} else {
		responseClient(res, 200, 1, '您还没登录！！！');
	}
};

userResources.post('/register', (req, res) => {
    let { name, password, email, introduce, img_url } = req.body;
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
				img_url,
				introduce,
            }); 
            userDao.create(user).then(
                data => {
                    responseClient(res, 200, 0, 'Successful', data);
                    return;
                }
            )
            .catch(error => {
                responseClient(res);
                return;
            })
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