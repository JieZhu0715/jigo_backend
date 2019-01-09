let BaseDao = require('./baseDao');
let Order = require('../schema/order')
let ObjectId = require('mongodb').ObjectID;

class OrderDao extends BaseDao {
    constructor() {
        super(Order);
    }
}

module.exports = OrderDao;