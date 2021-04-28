const express = require('express');

const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'pfa'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(name) values('Felipe Cararo')`;
connection.query(sql);
connection.end();

app.get('/', (req,res) => {
  var con = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'pfa'
  });

  con.connect(function(err) {
    if (err) throw err;

    con.query("SELECT * FROM people", function (err, result, fields) {
      if (err) throw err;

      let items = [];
      result.forEach(element => {
        items.push(element.name);
      });
      res.send(`<h1>Full Cycle Rocks!</h1> <br>${items.join(', ')}`);
    });

  });
});

app.listen(port, ()=> {
  console.log(`Rodando na porta ${port}`);
})