const mongoose = require('mongoose')
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const { NEWS } = require('../constant');
const schema = new Schema({
    title: String,
    content: String,
    createdBy: { type: ObjectId, ref: 'User' },
    countLike: {
        type: Number,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    },
    avangeRating: {
        type: mongoose.Schema.Types.Double,
        default: 0
    },
    view: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: NEWS.STATUS.NEW
    },
    count: Number,
    cateNews: {
        type: ObjectId,
        ref: 'CateNews'
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

const NewsModel = mongoose.model('News', schema);

module.exports = NewsModel;