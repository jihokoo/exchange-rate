var data = require('../models/store')();

exports.create = function(req, res){
  var newTransaction = data.push(req.body);
  res.json(newTransaction);
};

exports.showAll = function(req, res){
  res.json(data.list());
};

exports.convert = function(req, res){
  res.json();

};

exports.getConversionRate = function(req, res){
  res.json();
};