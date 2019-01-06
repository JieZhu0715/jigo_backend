let BaseDao = require('./baseDao');
let Order = require('../schema/order')
let ObjectId = require('mongodb').ObjectID;

class OrderDao extends BaseDao {
    constructor() {
        super(Order);
    }
}


function test() {
    let orderDao = new OrderDao();
    // let bookEntity = new Item({title: '三国', author: '罗贯中'});
    // let bookEntity1 = new Item({title: '蓄势待发1', author: '麻花'});
    // let bookEntity2 = new Item({title: '蓄势待发2', author: '麻花'});
    // itemDao.save({name: '三国', created_by: '罗贯中中'}).then((result) => console.log('save dao --> ', result));
    // itemDao.update({name: '蓄势待发'}, {$set: {author: '开心'}}).then((result) => console.log('update dao--> ', result));
    // orderDao.create({ item_id: ObjectId(1), user_id: ObjectId(1), quantity: 1 }).then((result) => console.log('create dao-->', result));
    // orderDao.findOneAndPopulate({ item_id: ObjectId('000000012d141e4a51989b09') }, undefined, 'item_id')
        // .then((results) => console.log('findOne dao --> ', results));
    // itemDao.findAll({title: '基督山伯爵'}).then((results) => console.log('findOne dao --> ', results));
    // itemDao.remove({title: '蓄势待发'}).then((results) => console.log('remove dal --> ', results));
}

// test()
module.exports = OrderDao;