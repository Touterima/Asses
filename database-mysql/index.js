const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);


const getAllPhrases = function(callback) {
  const query = 'SELECT * FROM phrases';
  connection.query(query, (err, results) => {
    if (err) {
      return callback(err); 
    }
    callback(null, results); 
  });
};

const updatePhrase = function (id, status, callback) {
  const query = 'UPDATE phrases SET status = ? WHERE id = ?';
  connection.query(query, [status, id], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

const addPhrase = (phrase, callback) => {
  const { kor, rom, eng } = phrase;
  const query = 'INSERT INTO phrases (kor, rom, eng, status) VALUES (?, ?, ?, "Not yet")';
  connection.query(query, [kor, rom, eng], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

module.exports = {
  getAllPhrases,
  updatePhrase,
  addPhrase
};