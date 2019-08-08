var express = require('express');
var router = express.Router();
var db = require('../model/db')
var URL = require('url')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/getUsers',function(req,res){
  
})
module.exports = router;
