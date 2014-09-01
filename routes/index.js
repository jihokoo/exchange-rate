var express = require('express');
var router = express.Router();
var index = require('../app/controllers/index');

/* GET home page */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

router.post('/paypal/create', index.create);

router.get('/paypal/activity', index.getAll);

router.post('/paypal/convert', index.convert);

router.post('/paypal/conversionRate', index.getConversionRate);

module.exports = router;