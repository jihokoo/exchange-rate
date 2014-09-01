var should = require('should'),
  request = require('supertest'),
  app = require('../app'),
  context = describe,
  agent = request.agent(app),
  should = require('should'),
  Transaction = require('../app/models/store');

describe('Transaction controller', function () {

  before(function () {
    Transaction.clear();
  });

  describe('GET /paypal/activity', function () {
    it('should respond with Content-Type text/json', function (done) {
      agent
      .get('/paypal/activity')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        res.body.should.be.an.instanceOf(Array);
        res.body.length.should.equal(0);
      })
      .end(done);
    });

    it('should return transactions if there is one in the DB', function (done) {
      var newTransaction = {
        'type': 'Purchase',
        'subject': 'New Computer',
        'date': new Date().toString(),
        'amount': 2000
      };

      Transaction.push(newTransaction);

      agent
        .get('/paypal/activity')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res) {
          res.body.should.be.an.instanceOf(Array);
          res.body[0].should.containDeep(newTransaction);
        })
        .end(done);
    });

    it('should return an article if there is one in the DB', function (done) {
      var anotherTransaction = {
        'type': 'Purchase',
        'subject': 'New Phone',
        'date': new Date().toString(),
        'amount': 200
      };

      Transaction.push(anotherTransaction);

      agent
        .get('/paypal/activity')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res) {
          res.body.should.be.an.instanceOf(Array);
          res.body[0].subject.should.equal('New Computer');
          res.body[1].subject.should.equal('New Phone');
        })
        .end(done);
    });
  });

  describe('POST /paypal/create', function () {

    it('should return the JSON of the object created', function (done) {
      agent
        .post('/paypal/create')
        .send({
          'type': 'Purchase',
          'subject': 'Testing Creating Transactions',
          'date': new Date().toString(),
          'amount': 200
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res) {
          res.body.subject.should.equal('Testing Creating Transactions');
        })
        .end(done);
    });

    it('should return a 500 error if the fields are invalid', function (done) {
      agent
        .post('/paypal/create')
        .expect(500)
        .end(done);
    });
  });

  describe('POST /paypal/currencyConversion', function () {

    it('should be able to convert USD into foreign currency', function (done) {
      agent
        .post('/paypal/convert')
        .send({
          'convertTo': 'EUR',
          'convertFrom': 'USD',
          'amount': '500'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res) {
          var symbol = res.body.symbol;
          var amount = parseFloat(res.body.amount);
          symbol.should.equal('€');
          amount.should.be.type('number');
          (!!amount).should.be.true;
        })
        .end(done);
    });

    it('should return a 500 error if the fields are invalid', function (done) {
      agent 
        .post('/paypal/convert')
        .send({
          'convertTo': 'EUR',
          'convertFrom': 'USD'
        })
        .expect('Content-Type', /json/)
        .expect(500)
        .expect(function(res) {
          res.body.message.should.equal('Error: must post a currency code to convert to and a valid amount')
        })
        .end(done);
    });
  });

  describe('POST /paypal/conversionRate', function () {

    it('should be able to get foreign exchange rates', function (done) {
      agent
        .post('/paypal/conversionRate')
        .send({
          'convertTo': 'EUR',
          'convertFrom': 'USD'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res) {
          var symbol = res.body.symbol
          var rate = parseFloat(res.body.rate);
          symbol.should.equal('€');
          rate.should.be.type('number');
          (!!rate === true).should.be.true;
        })
        .end(done);
    });

    it('should return a 500 error if the fields are invalid', function (done) {
      agent
        .post('/paypal/conversionRate')
        .send({
          'convertTo': 's'
        })
        .expect('Content-Type', /json/)
        .expect(500)
        .expect(function(res) {
          res.body.message.should.equal('Error: must enter two currency codes to convert from and convert to.');
        })
        .end(done);
    });
  });
});