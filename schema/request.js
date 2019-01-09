let { Schema } = require('mongoose');
let { mongoClient } = require('../utils/mongo');
let plugin = require('../utils/plugin');

const requestSchema = new Schema({
	// 用户 id
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    
    // content
    description: { type: String, required: true, validate: /\S+/ },
    
    // reference
    reference: { type: String, validate: /\S+/ }, 

    quantity: { type: Number },

	// 状态 => 0 ready / 1 processed / -1 deleted / -2 fake
	status: { type: Number, default: 0 },
});

/**
 * add plugin
 */
requestSchema.plugin(plugin.createdAt);
requestSchema.plugin(plugin.updatedAt);

let Request = mongoClient.model('Request', requestSchema);
module.exports = Request;