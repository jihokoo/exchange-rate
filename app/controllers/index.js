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
  var convertTo = req.body.convertTo;
  var amount = parseFloat(req.body.amount);
  if(convertTo && (amount >= 0)){
    forex.getRate(convertTo)
      .then(function(data){
        var symbol = data.split(' ')[0];
        var rate = parseFloat(data.split(' ')[1]);
        amount = rate * amount;
        res.json(200, {amount: symbol+' '+amount});
      }, function(err){
        console.log('conver', err);
        res.json(500, err);
      });
  } else{
    res.json(500, {message: 'Error: must post a currency code to convert to and a valid amount'})
  }
};

exports.getConversionRate = function(req, res){
  console.log('getConversionRate')
  console.log(req.params.currency)
  var currency = req.params.currency;
  if(currency){
    forex.getRate(currency)
      .then(function(data){
        res.json(200, {rate: data})
      }, function(err){
        res.json(500, {message: 'Error: '+err.message});
      });
  } else{
    console.log('hello')
    res.json(500, {message: 'Error: must enter a currency code'});
  }
};