let { Schema } = require('mongoose');
let { mongoClient } = require('../utils/mongo');
let plugin = require('../utils/plugin');

const orderSchema = new Schema({
	item_id: { type: Schema.Types.ObjectId, ref: 'Item', required: true },

	// 用户 id
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    
    // Quantity
    quantity: {type: Number, default: 0},

	// 状态 => 0 ready / 1 processed / -1 deleted / -2 fake
    status: { type: Number, default: 0 },
    
    email: { type: String }, 

    wechat: { type: String },
});

/**
 * add plugin
 */
orderSchema.plugin(plugin.createdAt);
orderSchema.plugin(plugin.updatedAt);

let Order = mongoClient.model('Order', orderSchema);
module.exports = Order;