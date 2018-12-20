let BaseDao = require('./baseDao');
let User = require('../schema/user')

class UserDao extends BaseDao {
    constructor() {
        super(User);
    }
}

module.exports = UserDao;