import React, { useState, useEffect } from 'react';

const Practice = () => {
  const [phrases, setPhrases] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [progress, setProgress] = useState(0);

  const calculateProgress = (allPhrases) => {
    const total = allPhrases.length;
    const gotItCount = allPhrases.filter(p => p.status === 'Got it').length;
    const percentage = total === 0 ? 0 : Math.round((gotItCount / total) * 100);
    setProgress(percentage);
  };

  useEffect(() => {
    fetch('/api/phrases')
      .then((res) => res.json())
      .then((data) => {
        calculateProgress(data); 
        const filtered = data.filter(p => p.status !== 'Got it');
        const ordered = filtered.sort((a, b) => {
          const priority = { 'Not yet': 0, 'Almost': 1 };
          return priority[a.status] - priority[b.status];
        });
        setPhrases(ordered);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des phrases :', error);
      });
  }, []);

  const handleStatusClick = (status) => {
    const currentPhrase = phrases[currentIndex];

    fetch(`/api/phrases/${currentPhrase.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur lors de la mise à jour du statut');
        }

        const updatedAll = phrases.map((phrase, index) =>
          index === currentIndex ? Object.assign({}, phrase, { status }) : phrase
        );

        const updatedPhrases = updatedAll
          .filter(p => p.status !== 'Got it')
          .sort((a, b) => {
            const priority = { 'Not yet': 0, 'Almost': 1 };
            return priority[a.status] - priority[b.status];
          });

        setPhrases(updatedPhrases);
        setCurrentIndex(0);
        setShowTranslation(false);

        fetch('/api/phrases')
          .then((res) => res.json())
          .then((data) => {
            calculateProgress(data);
          });
      })
      .catch((error) => {
        console.error('Erreur :', error);
      });
  };

  const currentPhrase = phrases[currentIndex];

  return (
    <div>
      <h1>Practice</h1>
      <p>Progress: {progress}%</p> {}

      {phrases.length === 0 ? (
        <div className="card">
           Congrats for completing all the phrases!
        </div>
      ) : currentPhrase ? (
        <div className="card">
          <div className="card-kor">{currentPhrase.kor}</div>
          <div className="card-rom">{currentPhrase.rom}</div>

          <div
            className="card-eng"
            onClick={() => setShowTranslation(!showTranslation)}
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
          >
            {showTranslation ? currentPhrase.eng : 'Reveal Translation'}
          </div>

          <button onClick={() => handleStatusClick('Not yet')}>Not yet</button>
          <button onClick={() => handleStatusClick('Almost')}>Almost</button>
          <button onClick={() => handleStatusClick('Got it')}>Got it</button>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default Practice;
