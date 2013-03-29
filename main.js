var express = require('express')
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'chitika',
  database : 'search_engine'
});
connection.connect();

app.get('/', function(req, res){
  console.log("Request for /");
  res.sendfile('index.html');
});

app.get('/search', function(req,res){
  console.log("Request for /search ");
  
  var sqlQuery = "Select title, description, href from search where tags LIKE ";
  var searchTerms = req.query.query.split(" ");
  for (var i in searchTerms) {
    if (i == 0) {
      sqlQuery += "'%"+searchTerms[i]+"%'"
    } else {
      sqlQuery += " AND tags LIKE '%"+searchTerms[i]+"%'";
    }
  }
  console.log('Generated query: ', sqlQuery);
  connection.query(sqlQuery, function(err, rows, fields){
    if (err)
      console.error(err);
    res.json(rows);
    //console.log('The solution is: ', rows);
  });
});

app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');

//connection.end();
