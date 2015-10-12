var express = require('express');
var router = express.Router();

var Article = require('../models/article')

router.get('/', function(req, res, next) {
	Article.getArticles(function(err, articles){
		if(err){
			console.log(err);
		}
		res.json(articles);
	});
});

router.get('/:id', function(req, res, next) {
	Article.getArticleByID(req.params.id, function(err, article){
		if(err){
			console.log(err);
		}
		res.json(article);
	});
});

router.get('/category/:category', function(req, res, next) {
	Article.getArticleByCategory(req.params.category, function(err, articles){
		if(err){
			console.log(err);
		}
		res.json(articles);
	});
});

router.post('/', function(req, res, next){
	//get form values
	var title = req.body.title;
	var category = req.body.category;
	var body = req.body.body;

	//new article object
	var newArticle = new Article({
		title: title,
		category: category,
		body: body
	});

	//create article

	Article.createArticle(newArticle, function(err, article){
		if(err){
			console.log(err);
		}
		//res.location('/articles');
		//res.redirect('/articles');
	});
});

//update
router.put('/', function(req, res, next){
	//get form values
	var id = req.body.id;
	var title = req.body.title;
	var category = req.body.category;
	var body = req.body.body;

	//new article object
	var data = new Article({
		title: title,
		category: category,
		body: body
	});

	//update article
	Article.updateArticle(id, data, function(err, article){
		if(err){
			console.log(err);
		}
		res.location('/articles');
		res.redirect('/articles');
	});
});

router.delete('/:id', function(req, res, next) {
	var id = req.params.id;
	Article.removeArticle(id, function(err, article){
		if(err){
			console.log(err);
		}
		res.location('/articles');
		res.redirect('/articles');
	});
});


module.exports = router;
