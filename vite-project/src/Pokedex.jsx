import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import './pokedex.css';
const Pokedex = () => {
    const [pokemonData, setPokemonData] = useState(null);
    const [error, setError] = useState(null);

    const fetchPokemon = async (query) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
            if (!response.ok) throw new Error("Pokémon niet gevonden");
            const data = await response.json();
            setPokemonData(data);
            setError(null);
        } catch (error) {
            setPokemonData(null);
            setError(error.message);
        }
    };

    return (
        <div className="pokedex">
            <h1>Pokedex</h1>
            <SearchBar onSearch={fetchPokemon} />
            {error && <p className="error">{error}</p>}
            {pokemonData && (
                <div className="pokemon-card">
                    <h2>{pokemonData.name}</h2>
                    <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
                    
                    {/* Basis Statistieken */}
                    <p>HP: {pokemonData.stats[0].base_stat}</p>
                    <p>Attack: {pokemonData.stats[1].base_stat}</p>
                    <p>Defense: {pokemonData.stats[2].base_stat}</p>
                    <p>Speed: {pokemonData.stats[5].base_stat}</p>

                    {/* Types */}
                    <div className="types">
                        <h3>Types</h3>
                        {pokemonData.types.map((typeInfo, index) => (
                            <span key={index} className={`type ${typeInfo.type.name}`}>
                                {typeInfo.type.name}
                            </span>
                        ))}
                    </div>

                    {/* Moves */}
                    <div className="moves">
                        <h3>Moves</h3>
                        <ul>
                            {pokemonData.moves.slice(0, 5).map((moveInfo, index) => (
                                <li key={index}>{moveInfo.move.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pokedex;