const express = require('express');
const app = express();
const router = express.Router();
const Graph = require('./routes/index');
const Data = require('./routes/data');
const cors = require('cors')


const port = 3001;
app.use(cors());
app.listen(port);
/*
router.get('/', function(req, res){
    var sql = 'SELECT * FROM station';
    connection.query(sql, params, function (error, rows, fields) {
      if (!error) {
        for (var i = 0; i < rows.length; i++) {
          console.log(rows[i]);
          res.header('Access-Control-Allow-Origin', '*');
          res.send(console.log(rows[i]))
        }
      } else {
        console.log('query error : ' + error);
      }
    });
  })
*/

app.use('/Graph',Graph);
app.use('/Data',Data);
//module.exports = router;
