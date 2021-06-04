
const express = require('express');
var router = express.Router();
const db_config = require('../config/database.js');
const conn = db_config.init();

connection = db_config.init();

router.get('/', function(req, res){
    var sql = 'SELECT * FROM station';
    
    connection.query(sql, function (error, rows, fields) {
      if (!error) {
        //for (var i = 0; i < rows.length; i++) {
          //console.log(rows[i]);
        res.send((rows));
        //}
      } else {
        console.log('query error : ' + error);
      }
    });
  })
  

module.exports = router

