import React, { useState, useEffect } from 'react';

const Practice = () => {
  const [phrases, setPhrases] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < phrases.length - 1 ? prevIndex + 1 : 0 
    );
  };

  const currentPhrase = phrases[currentIndex];

  return (
    <div>
      <h1>Practice</h1>
      {currentPhrase ? (
        <div className="card">
          <div className="card-kor">{currentPhrase.kor}</div>
          <div className="card-rom">{currentPhrase.rom}</div>
          <div className="card-eng">{currentPhrase.eng}</div>
          <button onClick={handleNext}>Not yet</button>
          <button onClick={handleNext}>Almost</button>
          <button onClick={handleNext}>Got it</button>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default Practice;
