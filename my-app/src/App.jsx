import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplayName(name);
  };

  return (
    <div>
      <h1>Digite seu nome:</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
        />
        <button type="submit">Exibir nome</button>
      </form>
      {displayName && <h2>Nome exibido: {displayName}</h2>}
    </div>
  );
}

export default App;
