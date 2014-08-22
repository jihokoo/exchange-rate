var _ = require("underscore");

var store = function() {
  var data = []; // private variable closed over

  var validate = function(input) {
    var type = input.type, 
      subject = input.subject, 
      date = input.date, 
      amount = input.amount;

    if(!(type && subject && date && amount)){
      return {message: 'Error: Missing data fields.'};
    } else if(new Date(date).toString() === 'Invalid Date'){
      return {message: 'Error: Invalid Date.'};
    } else if(['Purchase', 'Transfer', 'Refund'].indexOf === -1){
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
      if(isValidated === true) return validateResult;

      data.push({
        "type": input.type,
        "subject": input.subject,
        "date": input.date,
        "amount": input.amount
      });
    },
    list: function() {
      return data;
    },
    find: function(properties) {
      return _.where(data, properties);
    }
  };
};

module.exports = store;

