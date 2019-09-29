const mongoose = require('mongoose')
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const schema = new Schema({
    user: { type: ObjectId, ref: 'User' },
    userFl: { type: ObjectId, ref: 'User' },
    isDelete: { type: Boolean, default: false }
});

const FollowModel = mongoose.model('Follow', schema);

module.exports = FollowModel;