
const express = require('express');
var router = express.Router();
const db_config = require('../config/database.js');
const conn = db_config.init();

connection = db_config.init();
//route = '/station_id_4'

router.get('/', function(req, res){
    var sql = 'SELECT * FROM station_id_4';
    
    connection.query(sql, function (error, rows, fields) {
      if (!error) {
        //for (var i = 0; i < rows.length; i++) {
        console.log("success");
        res.send((rows));
        //}
      } else {
        console.log('query error : ' + error);
      }
    });
  })
/*
router.get(route, function(req, res){
    var sql = 'SELECT * FROM ' + route;
    
    connection.query(sql, function (error, rows, fields) {
      if (!error) {
        //for (var i = 0; i < rows.length; i++) {
        console.log("success");
        res.send((rows));
        //}
      } else {
        console.log('query error : ' + error);
      }
    });
  })
*/  

module.exports = router

