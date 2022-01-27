const express = require('express');
const app = express();
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const MongoClient = require('mongodb').MongoClient;
const cli = require('nodemon/lib/cli');

app.set('view engine', 'ejs');

var db;
MongoClient.connect('mongodb+srv://admin:guest@cluster0.ibo0u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',(err, client) => {
  if (err) return console.log(err);

  db = client.db('todo');

  app.listen(8080, () => {
      console.log('listening on 8080');
  })
})



app.get('/', (req, res) => { 
  res.sendFile(__dirname +'/index.html');
});

app.get('/write', (req, res) => { 
    res.sendFile(__dirname +'/write.html');
});

app.get('/list', (req, res) => {
  db.collection('post').find().toArray((err, result) => {
    console.log(result);
    res.render('list.ejs', { posts : result });
  });

});

app.post('/add', (req, res) => {
  res.send('전송완료');
  
  db.collection('counter').findOne({name: "게시물갯수"}, (res, result) => {
    var TotalP = result.totalPost; 

    db.collection('post').insertOne({_id: TotalP + 1, 할일: req.body.title, 날짜 : req.body.date}, (err, result) => {
      console.log('저장완료');
      db.collection('counter').updateOne({name:'게시물갯수'},{ $inc: {totalPost:1} }, (err, result) => {
    if (err) {return console.log(err)};
      

      });

      
    });
  });
});

