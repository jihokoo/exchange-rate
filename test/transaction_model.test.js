var should = require('should'),
  Transaction = require('../app/models/store');

describe('Transactions', function () {

  beforeEach(function () {
    Transaction.clear();
  });

  it("should be an instance of Object", function(){
    Transaction.should.be.an.instanceOf(Object);
  });

  it("should have methods 'push', 'list', 'find'", function() {
    Transaction.push.should.be.an.instanceOf(Function);
    Transaction.list.should.be.an.instanceOf(Function);
    Transaction.find.should.be.an.instanceOf(Function);
  });

  it('should have a method to get the data store', function () {
    var data = Transaction.list();
    data.should.be.an.instanceOf(Array);
    data.length.should.equal(0);
  });

  it('should have a method to insert new transactions', function(){
    var newTransaction = {
      'type': 'Purchase',
      'subject': 'New Computer',
      'date': new Date().toString(),
      'amount': 2000
    };

    Transaction.push(newTransaction);
    Transaction.list().length.should.equal(1);
    Transaction.list()[0].should.eql(newTransaction);
  });

  it('should not accept faulty data', function(){
    Transaction.push({})['message'].should.equal('Error: Missing data fields.')
    Transaction.list().length.should.equal(0);

    Transaction.push({
      'type': 'Purchase',
      'subject': 'New Computer',
      'date': 'wrong date',
      'amount': 2000
    }).message.should.equal('Error: Invalid Date.')
    Transaction.list().length.should.equal(0);

    Transaction.push({
      'type': 'hello',
      'subject': 'New Computer',
      'date': new Date().toString(),
      'amount': 2000
    }).message.should.equal('Error: Invalid Transaction Type.')
    Transaction.list().length.should.equal(0);

    Transaction.push({
      'type': 'Purchase',
      'subject': 'New Computer',
      'date': new Date().toString(),
      'amount': NaN
    }).message.should.equal('Error: Invalid Amount.')
    Transaction.list().length.should.equal(0);
  });

  it('should have a method to find objects by key value pairs', function(){
    var now = new Date().toString();
    Transaction.find({'date': now}).length.should.equal(0);

    Transaction.push({
      'type': 'Purchase',
      'subject': 'New Computer',
      'date': now,
      'amount': 2000
    });

    Transaction.find({'date': now}).should.containDeep([{
      'type': 'Purchase',
      'subject': 'New Computer',
      'date': now,
      'amount': 2000
    }]);
  });
});