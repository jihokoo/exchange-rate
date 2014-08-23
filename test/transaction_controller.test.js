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
});