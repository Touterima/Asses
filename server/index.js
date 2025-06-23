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

app.patch('/api/phrases/:id', (req, res) => {
  const phraseId = req.params.id;
  const { status } = req.body;

  db.updatePhrase(phraseId, status, (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour du statut :', err);
      res.status(500).send(err);
    } else {
      res.status(200).send('Statut mis à jour');
    }
  });
});

app.post('/api/phrases', (req, res) => {
  const phrase = req.body;
  db.addPhrase(phrase, (err, result) => {
    if (err) {
      console.error('Erreur lors de l’ajout de la phrase :', err);
      return res.status(500).send(err);
    }
    res.status(201).json({ message: 'Phrase ajoutée', id: result.insertId });
  });
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});






