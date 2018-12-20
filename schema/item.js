let { Schema } = require('mongoose');
let { mongoClient } = require('../utils/mongo');
let autoIncrement = require('mongoose-auto-increment');
let plugin = require('../utils/plugin');

const itemSchema = new Schema(
    {
        name: String,
        description: { type: String, default: '' },
        created_by: { type: String, lowercase: true }, // lowercase needs setters
        img_url: { type: String, default: 'https://upload-images.jianshu.io/upload_images/12890819-80fa7517ab3f2783.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240' },
        // type => 1: common item
        type: { type: Number, default: 1 },
        price: { type: Number, default: -1 },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true }],
	    like_users: [
		{
			id: { type: mongoose.Schema.Types.ObjectId },
			name: { type: String, required: true, default: '' },
			// type 0: poster 1：others
			type: { type: Number, default: 1 },
			// introduction
			introduce: { type: String, default: '' },
			avatar: { type: String, default: 'user' },
			create_time: { type: Date, default: Date.now },
        },],
        // Other meta info
        meta: {
            views: { type: Number, default: 0 },
            likes: { type: Number, default: 0 },
            comments: { type: Number, default: 0 },
        },
    },
    {
        runSettersOnQuery: true
    }
)

/**
 * add plugin
 */
itemSchema.plugin(plugin.createdAt);
itemSchema.plugin(plugin.updatedAt);
itemSchema.plugin(autoIncrement.plugin, {
	model: 'Item',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});


/**
 * 参数一要求与 Model 名称一致
 * 参数二为 Schema
 * 参数三为映射到 MongoDB 的 Collection 名
 */
let Item = mongoClient.model('Item', itemSchema);
module.exports = Item;