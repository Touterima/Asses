import React, { useState, useEffect } from 'react';

const PhraseList = () => {
  const [phrases, setPhrases] = useState([]);

  
  useEffect(() => {
  fetch('/api/phrases')
    .then((res) => res.json())
    .then((data) => {
      setPhrases(data);
    })
    .catch((error) => {
      console.error('Erreur lors du chargement des phrases :', error);
    });
}, []);


  return (
    <div>
      <h1>Phrase List</h1>
      <div className="phrases">
        <div className="phrase-table">
          <div className="phrase-header phrase-row">
            <div className="phrase-data">Korean</div>
            <div className="phrase-data">Romanization</div>
            <div className="phrase-data">English</div>
            <div className="phrase-data">Status</div>
          </div>
          {phrases.map((phrase) => (
            <div className="phrase-row" key={phrase.id}>
              <div className="phrase-data">{phrase.kor}</div>
              <div className="phrase-data">{phrase.rom}</div>
              <div className="phrase-data">{phrase.eng}</div>
              <div className="phrase-data">{phrase.status}</div> {/* Tu peux le rendre dynamique plus tard */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhraseList;

