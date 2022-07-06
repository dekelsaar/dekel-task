var express = require('express');
var app = express();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const dbName = 'dekeldb';
const client = new MongoClient(url);
client.connect();
const db = client.db(dbName);

//insert user to users for test
const usersCollection = db.collection("users");
usersCollection.insertOne({name:'moshe'}, function (err, result) {
});

//insert company to companies for tset
const companiesCollection = db.collection("companies");
companiesCollection.insertOne({name:'ewave'}, function (err, result) {
});  

// users endpoints and return data
app.get('/api/users', function(req, res, next) {
  const db = client.db(dbName);
  const usersCollection = db.collection("users");

  usersCollection.find({}).toArray(function (err, result) {
    if (err) throw err;
    res.send(result)
      
  });

});

// companies endpoints and return data
app.get('/api/companies', function(req, res, next) {
  const db = client.db(dbName);
  const companiesCollection = db.collection("companies");
  companiesCollection.find({}).toArray()

  companiesCollection.find({}).toArray(function (err, result) {
    if (err) throw err;
    res.send(result)
      
  });

});

// homepage
app.get('/', (req, res) => {
  res
    .status(200)
    .send('This is homepage')
});
 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});