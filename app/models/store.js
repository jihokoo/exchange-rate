var _ = require("underscore");

var store = function() {
  var data = []; // private variable closed upon

  return {
    push: function(input) {
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
}();

module.exports = store;