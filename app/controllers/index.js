var data = require('../models/store');
var forex = require('../../forex/forex')({loadFromFile: true});

exports.create = function(req, res){
  var newData;
  if(req.body){
    newData = data.push(req.body);
    if(newData.message){
      res.json(500, newData);
    } else{
      res.json(200, newData);
    }
  } else{
    res.json(500);
  }
};

exports.getAll = function(req, res){
  var list = data.list();
  res.json(200, list);
};

exports.convert = function(req, res){
  var convertTo = req.body.convertTo;
  var convertFrom = req.body.convertFrom;
  var amount = parseFloat(req.body.amount);
  if(convertTo && convertFrom && (amount >= 0)){
    forex.getRate([convertFrom, convertTo])
      .then(function(data){
        from = data[0];
        to = data[1];
        var conversionRate = to.rate / from.rate;
        amount = conversionRate * amount;
        res.json(200, {symbol: to.symbol, amount: amount});
      }, function(err){
        res.json(500, err);
      });
  } else{
    res.json(500, {message: 'Error: must post a currency code to convert to and a valid amount'})
  }
};

exports.getConversionRate = function(req, res){
  var convertTo = req.body.convertTo;
  var convertFrom = req.body.convertFrom;
  if(convertTo && convertFrom){
    forex.getRate([convertFrom, convertTo])
      .then(function(data){
        console.log('getconversionrate', data);
        from = data[0];
        to = data[1];
        var conversionRate = to.rate / from.rate;
        res.json(200, {rate: conversionRate, symbol: to.symbol})
      }, function(err){
        res.json(500, {message: 'Error: '+err.message});
      });
  } else{
    res.json(500, {message: 'Error: must enter two currency codes to convert from and convert to.'});
  }
};