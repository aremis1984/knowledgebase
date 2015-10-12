var mongoose = require('mongoose');

var categorySquema = mongoose.Schema({
	name:{
		type: String,
		index: true,
		required: true
	},
	description:{
		type: String,
	}
});

var Category = module.exports = mongoose.model('Category', categorySquema);

//get all Category in table

module.exports.getCategories = function(callback){
	Category.find(callback);
}

//get Category by id

module.exports.getCategoryByID = function(id, callback){
	Category.findById(id, callback);
}

//get a category of articles

module.exports.getArticleByCategory = function(category, callback){
	//it is like where category = 'some category'
	var query = {category: category};
	Category.find(query, callback);
}
//add category
module.exports.createCategory = function(newCategory, callback){
	newCategory.save(id, callback);
}