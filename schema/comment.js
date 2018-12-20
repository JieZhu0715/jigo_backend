let { Schema } = require('mongoose');
let { mongoClient } = require('../utils/mongo');
let autoIncrement = require('mongoose-auto-increment');
let plugin = require('../utils/plugin');


const commentSchema = new Schema({
	// 评论所在的文章 id
	article_id: { type: Schema.Types.ObjectId, required: true },

	// content
	content: { type: String, required: true, validate: /\S+/ },

	// 是否置顶
	is_top: { type: Boolean, default: false },

	// 被赞数
	likes: { type: Number, default: 0 },

	// 用户 id
	user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },

	// 状态 => 0 待审核 / 1 通过正常 / -1 已删除 / -2 垃圾评论
	state: { type: Number, default: 1 },
});

/**
 * add plugins
 */
commentSchema.plugin(plugin.createdAt);
commentSchema.plugin(plugin.updatedAt);
commentSchema.plugin(autoIncrement.plugin, {
	model: 'Comment',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

let Comment = mongoClient.model('Comment', commentSchema);
module.exports = Comment;