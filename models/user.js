var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({ 
	name: String,
    provider: String,
    provider_id: {type: String, unique: true},
    createdAt: {type: Date, default: Date.now}
}));