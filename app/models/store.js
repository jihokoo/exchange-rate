var _ = require("underscore");

var store = (function() {
  var data = []; // private variable closed over

  var validate = function(input) {
    var type = input.type, 
      subject = input.subject, 
      date = input.date, 
      amount = input.amount;
    if(!(type && subject && date && amount) && (amount ===undefined)){
      return {message: 'Error: Missing data fields.'};
    } else if(new Date(date).toString() === 'Invalid Date'){
      return {message: 'Error: Invalid Date.'};
    } else if(['Purchase', 'Transfer', 'Refund'].indexOf(type) === -1){
      return {message: 'Error: Invalid Transaction Type.'};
    } else if((!!amount === false) || (amount !== 0) && (typeof amount !== 'number')){
      return {message: 'Error: Invalid Amount.'};
    } else{
      return true;
    }
  };

  return {
    push: function(input) {
      var isValidated = validate(input);
      if(isValidated !== true) return isValidated;

      data.push({
        "type": input.type,
        "subject": input.subject,
        "date": input.date,
        "amount": parseFloat(input.amount)
      });
      return input;
    },
    list: function() {
      return data;
    },
    find: function(properties) {
      return _.where(data, properties);
    },
    clear: function() {
      var toBeDeleted = data;
      data = [];
      delete toBeDeleted;
      return data;
    }
  };
})();

var transactions = [{type: 'Purchase', subject: 'Breakfasat', date: new Date(), amount: 15}, 
{type: 'Purchase', subject: 'Dinner', date: new Date(), amount: 20}, 
{type: 'Transfer', subject: 'Wages', date: new Date(), amount: 20},
{type: 'Refund', subject: 'Clothes', date: new Date(), amount: 50},
{type: 'Purchase', subject: 'Present', date: new Date(), amount: 20}];

transactions.forEach(function(transaction){
  store.push(transaction);
});

module.exports = store;

