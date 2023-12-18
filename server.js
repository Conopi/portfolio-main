const express = require('express')
const path = require('path')
const app = express()
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(express.json());
let db = new sqlite3.Database('./db.sqlite', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
  
  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS Otsiv(username TEXT, email TEXT, message TEXT)');
  });

  app.post('/feedback', (req, res) => {
    const stmt = db.prepare("INSERT INTO Otsiv (username, email, messag) VALUES(?, ?, ?)");
    stmt.run(req.body.username, req.body.email, req.body.messag, (err) => {
        if (err) {
            console.error(err.message);
            res.redirect('http://localhost:8888/error404.html');
        } else {
             res.redirect('http://localhost:8888/index.html');
        }
        stmt.finalize()
    });
});
  
app.use(express.static(path.join(__dirname, './Frontent/')))
const publicDir = path.join(__dirname, "./Frontent/")
app.get('/', (_, res) => {
    res.sendFile('index.html')
}) 
app.get('/contacts',(_, res) =>{
    res.sendFile(publicDir + 'index3.html')
} )
app.get('/work',(_, res) =>{
    res.sendFile(publicDir + 'index2.html')
} )
app.listen(8888)

process.on('exit', () => {
    try {
      db.close();
    } catch (err) {
      console.error(err.stack);
    }
  });
  
  app.use(function(err, req, res, next) {
    console.error(err.stack); // log the error stack
    res.redirect('http://localhost:8888/error404.html');
  });