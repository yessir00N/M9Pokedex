import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [pokemon, setPokemon] = useState(null);         
  const [inputValue, setInputValue] = useState('');     
  const [error, setError] = useState(null);             
  const [suggestions, setSuggestions] = useState([]);   

  
  const fetchPokemon = async (name) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      setPokemon(response.data);
      setError(null);
    } catch (error) {
      setError('Pokemon niet gevonden!');
      setPokemon(null);
    }
  };


  const fetchSuggestions = async () => {
    if (inputValue.length > 1) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
        const allPokemon = response.data.results.map((p) => p.name);
        const filteredSuggestions = allPokemon.filter((name) =>
          name.toLowerCase().startsWith(inputValue.toLowerCase())
        );
        setSuggestions(filteredSuggestions.slice(0, 10));  // Toon maximaal 10 suggesties
      } catch (error) {
        console.error('Fout bij ophalen van suggesties');
      }
    } else {
      setSuggestions([]); 
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, [inputValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPokemon(inputValue);
    setSuggestions([]); 
  };

  const handleSuggestionClick = (name) => {
    setInputValue(name);
    fetchPokemon(name);
    setSuggestions([]); 
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Pokédex</h1>
      <form onSubmit={handleSubmit} style={{ position: 'relative', display: 'inline-block' }}>
        <input
          type="text"
          placeholder="Typ een Pokémon naam"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Zoeken</button>
        {suggestions.length > 0 && (
          <ul style={{
            listStyleType: 'none',
            padding: '10px',
            margin: 0,
            width: '200px',
            position: 'absolute',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            zIndex: 1
          }}>
            {suggestions.map((name) => (
              <li
                key={name}
                style={{ padding: '8px', cursor: 'pointer' }}
                onClick={() => handleSuggestionClick(name)}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {pokemon && (
        <div style={{ marginTop: '20px' }}>
          <h2>{pokemon.name.toUpperCase()}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h3>Statistieken</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                <strong>{stat.stat.name.toUpperCase()}:</strong> {stat.base_stat}
              </li>
            ))}
          </ul>
          <h3>Types</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {pokemon.types.map((typeInfo) => (
              <li key={typeInfo.type.name}>{typeInfo.type.name.toUpperCase()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;