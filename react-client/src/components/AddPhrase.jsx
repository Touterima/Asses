import React, { useState } from 'react';

//import './style.css'
const AddPhrase = () => {
  const [kor, setKor] = useState('');
  const [rom, setRom] = useState('');
  const [eng, setEng] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/phrases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ kor, rom, eng }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage('Phrase added successfuly !');
        setKor('');
        setRom('');
        setEng('');
      })
      .catch((err) => {
        setMessage("Error while adding the phrase.");
        console.error(err);
      });
  };

  return (
    <div>
      <h1>Add a phrase</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Korean"
          value={kor}
          onChange={(e) => setKor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Romanization"
          value={rom}
          onChange={(e) => setRom(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="English"
          value={eng}
          onChange={(e) => setEng(e.target.value)}
          required
        />
        <button type="submit">Save</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddPhrase;
