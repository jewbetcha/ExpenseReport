const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(bodyParser.json())
app.set('view engine', 'ejs');

var db;

MongoClient.connect('mongodb://root:crudapp@ds031257.mlab.com:31257/expense', (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
})


app.get('/', (req,res) => {
    db.collection('expenses').find().toArray(function(err, result) {
        if (err) return console.log(err)

        res.render('index.ejs', {expenses: result})
    })
});

app.get('/charts', (req,res) => {
    res.render('charts.ejs')
});

app.get('/data', (req,res) => {
  db.collection('expenses').find().toArray(function(err, result) {
        if (err) return console.log(err)

        res.send(result);
    })
});

app.post('/expenses', (req, res) => {
  db.collection('expenses').save(req.body, (err, result) => {
      if (err) return console.log(err)

      console.log('saved to db')
      res.redirect('/')
  });
});

app.put('/expenses', (req, res) => {
  db.collection('expenses')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/expenses', (req, res) => {
  db.collection('expenses').findOneAndDelete({name: req.body.name},
  (err, result) => {
    if (err) return res.send(500, err)
    console.log(req.body.name + ' has been deleted')
    res.redirect('/')

  })
})