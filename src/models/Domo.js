var mongoose = require('mongoose');
var _ = require('underscore');

var DomoModel;

var setName = function(name){
	return _.escape(name).trim();
};

var setFavoriteFood = function(food){
	return _.escape(food).trim();
};

var DomoSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true,
		trim: true,
		set: setName
	},
	
	age:{
		type: Number,
		min: 0,
		required: true
	},
	
	favoriteFood:{
		type: String,
		required: true,
		trim: true,
		set: setFavoriteFood
	},
	
	owner:{
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account'
	},
	
	createdDate:{
		type: Date,
		default: Date.now
	}
});

DomoSchema.methods.toAPI = function(){
	return{
		name: this.name,
		age: this.age,
		favoriteFood: this.favoriteFood
	};
};

DomoSchema.statics.findByOwner = function(ownerId, callback){
	var search = {
		owner: mongoose.Types.ObjectId(ownerId)
	};
	
	return DomoModel.find(search).select("name age favoriteFood").exec(callback);
};

DomoSchema.statics.findByName = function(name, callback){
	
	return DomoModel.findOne(name).select("name age favoriteFood").exec(callback);;
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;










