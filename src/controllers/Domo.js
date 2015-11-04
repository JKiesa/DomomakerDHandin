var _ = require('underscore');
var models = require('../models');

var Domo = models.Domo;

var sorted = 'no';

var makerPage = function(req, res){
	
	Domo.DomoModel.findByOwner(req.session.account._id, function(err, docs){
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occurred'});
		}
		
		res.render('app', {csrfToken: req.csrfToken(), domos: docs});
	});
};

var makeDomo = function(req, res){
	
	if(!req.body.name || !req.body.age || !req.body.favoriteFood){
		return res.status(400).json({error: "RAWR Name, age, and favorite food are required"});
	}
	
	var domoData = {
		name: req.body.name,
		age: req.body.age,
		favoriteFood: req.body.favoriteFood,
		owner: req.session.account._id
	};
	
	var newDomo = new Domo.DomoModel(domoData);
	
	newDomo.save(function(err){
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occurred'});
		}
		
		res.json({redirect: '/maker'});
	});
};

/*var alterDomo = function(req, res){
	res.json({redirect: '/alterDomo'});
};

var alterDomoPage = function(req, res){
	
	Domo.DomoModel.findByOwner(req.session.account._id, function(err, docs){
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occurred'});
		}
		
		res.render('alterDomo', {csrfToken: req.csrfToken(), domos: docs});
		
	});
	
	Domo.DomoModel.findByName( , function(err, doc){
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occurred'});
		}
		
		res.render('alterDomo', {csrfToken: req.csrfToken(), domo: doc});
	});
};*/

var sortByName = function(req, res){
	Domo.DomoModel.findByOwner(req.session.account._id, function(err, docs){
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occurred'});
		}
		
		if(sorted != 'name'){
			//Sort in alphabetical order
			console.log("SORT NAME");
			var newDocs = [];
			var least = docs[0];
			while(docs.length > 0){
				for(var i=0; i<docs.length; i++){
					if(docs[i].name < least.name){
						least = docs[i];
					}
				}
				newDocs.push(least);
				var index = docs.indexOf(least);
				docs.splice(index, 1);
				least = docs[0];
				sorted = 'name';
			}
			docs = newDocs;
		}
		else
		{
			console.log("REVERSE NAME");
			//Reverse the order of the array
			docs.reverse();
		}
		
		res.render('app', {csrfToken: req.csrfToken(), domos: docs});
	});
	
};

var sortByAge = function(req, res){
	Domo.DomoModel.findByOwner(req.session.account._id, function(err, docs){
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occurred'});
		}
		
		if(sorted != 'age'){
			console.log("SORT AGE");
			//Sort in ascending age order
			var newDocs = [];
			var least = docs[0];
			while(docs.length > 0){
				for(var i=0; i<docs.length; i++){
					if(docs[i].age < least.age){
						least = docs[i];
					}
				}
				newDocs.push(least);
				var index = docs.indexOf(least);
				docs.splice(index, 1);
				least = docs[0];
			}
			docs = newDocs;
			sorted = 'age';
		}
		else
		{
			console.log("REVERSE AGE");
			//Reverse the order of the array
			docs.reverse();
			for(var i=0; i<docs.length; i++){
				console.log(docs[i].age);
			}
		}
		
		res.render('app', {csrfToken: req.csrfToken(), domos: docs});
	});
};

module.exports.makerPage = makerPage;
module.exports.make = makeDomo;
//module.exports.alterDomo = alterDomo;
//module.exports.alterDomoPage = alterDomoPage;
module.exports.sortByName = sortByName;
module.exports.sortByAge = sortByAge;