var data = require('../models/store');
var forex = require('../../forex/forex')({loadFromFile: true});

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
  console.log(req.body);
  var convertTo = req.body.convertTo;
  var amount = parseFloat(req.body.amount);
  if(convertTo && (amount >= 0)){
    forex.getRate(convertTo)
      .then(function(data){
        console.log(data);
        var symbol = data.split(' ')[0];
        var rate = (Math.round(parseFloat(data.split(' ')[1]) + 0.00001) * 100) / 100;
        amount = rate * amount;
        res.json(200, {symbol: symbol, amount: amount});
      }, function(err){
        console.log('err', err)
        console.log('convert', err);
        res.json(500, err);
      });
  } else{
    console.log('here')
    res.json(500, {message: 'Error: must post a currency code to convert to and a valid amount'})
  }
};

exports.getConversionRate = function(req, res){
  var currency = req.params.currency;
  if(currency){
    forex.getRate(currency)
      .then(function(data){
        var symbol = data.split(' ')[0];
        var rate = (Math.round(parseFloat(data.split(' ')[1]) + 0.00001) * 100) / 100;
        res.json(200, {rate: rate, symbol: symbol})
      }, function(err){
        res.json(500, {message: 'Error: '+err.message});
      });
  } else{
    res.json(500, {message: 'Error: must enter a currency code'});
  }
};