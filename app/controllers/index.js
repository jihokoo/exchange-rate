var data = require('../models/store');
var forex = require('../../forex/forex')();

exports.create = function(req, res){
  var newData;
  if(req.body){
    newData = data.push(req.body);
    if(newData.message){
      res.json(500, newData)
    } else{
      res.json(200, newData);
    }
  } else{
    res.json(500)
  }
};

exports.getAll = function(req, res){
  var list = data.list();
  res.json(200, list);
};

exports.convert = function(req, res){
  console.log('convert')
  res.json(200, {})
};

exports.getConversionRate = function(req, res){
  console.log('getConversionRate')
  res.json(200, {})
};