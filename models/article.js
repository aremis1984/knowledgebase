var mongoose = require('mongoose');

var articleSquema = mongoose.Schema({
	title:{
		type: String,
		index: true,
		required: true
	},
	body:{
		type: String,
		required: true
	},
	category:{
		type: String,
		index: true,
		required: true
	},
	date:{
		type: Date,
		default: Date.now
	}
});

var Article = module.exports = mongoose.model('Article', articleSquema);

//get all articles in table

module.exports.getArticles = function(callback){
	Article.find(callback);
}

//get article by id

module.exports.getArticleByID = function(id, callback){
	Article.findById(id, callback);
}

//get a category of articles

module.exports.getArticleByCategory = function(category, callback){
	//it is like where category = 'some category'
	var query = {category: category};
	Article.find(query, callback);
}

//add an article
module.exports.createArticle = function(newArticle, callback){
	newArticle.save(callback);
}

//update article

module.exports.updateArticle = function(id, data, callback){
	var title = data.title;
	var body = data.body;
	var category = data.category;
	
	var query = {_id:id};
	
	Article.findById(id, function(err, article){
		if(!article){
			return next(new Error('Could not load article'));
		}else{
			//update
			article.title = title;
			article.body = body;
			article.category = category;

			article.save(callback);
		}
	});
}

//remove article

module.exports.removeArticle = function(id, callback){
	Article.find({_id:id}).remove(callback);
}