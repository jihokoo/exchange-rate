var should = require('should')
  , Transaction;

describe('Transactions', function () {

  beforeEach(function (done) {
    Transaction = require('../app/models/store')();
  });

  it("should be an instance of Object", function(){
    Transaction.should.be.an.instanceOf(Object);
  });

  it("should have methods 'push', 'list', 'find'", function() {
    Transaction.push.should.be.an.instanceOf(Function);
    Transaction.list.should.be.an.instanceOf(Function);
    Transaction.find.should.be.an.instanceOf(Function);
  });

  it('should have a method to get the data store', function (done) {
    var data = Transaction.list();
    data.should.be.an.instanceOf(Array);
    data.length.should.equal(0);
  });

  it('should have a method to insert new transactions', function(){
    Transaction.push({
      'type': 'Purchase',
      'subject': 'New Computer',
      'date': new Date(),
      'amount': 2000
    });
    Transaction.list().length.should.equal(1);
  });

  it('should not accept faulty data', function(){
    Transaction.push({}).message.should.equal('Error: Missing data fields.')
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
      'date': new Date(),
      'amount': 2000
    }).message.should.equal('Error: Invalid Transaction Type.')
    Transaction.list().length.should.equal(0);

    Transaction.push({
      'type': 'Purchase',
      'subject': 'New Computer',
      'date': new Date(),
      'amount': NaN
    }).message.should.equal('Error: Invalid Amount.')
    Transaction.list().length.should.equal(0);
  });
});