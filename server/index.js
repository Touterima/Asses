const express = require('express');
const bodyParser = require('body-parser');

const db = require('../database-mysql');


const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// UNCOMMENT TO START
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(express.json());

app.get('/api/phrases', (req, res) => {
  //TODO - your code here!
  db.getAllPhrases((err, phrases) => {
    if (err) {
      console.error('Erreur MySQL :', err);
      res.status(500).send(err);
    } else {
      res.status(200).json(phrases);
    }
  });
});

//TODO - add additional route handlers as necessary

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});






