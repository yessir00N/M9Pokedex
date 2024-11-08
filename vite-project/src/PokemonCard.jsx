import React from 'react';
import './PokemonCard.css';

function PokemonCard({ data }) {
    const { name, sprites, stats, types, moves } = data;

    return (
        <div className="pokemon-card">
            <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
            <img src={sprites.front_default} alt={name} />

            <div className="types">
                {types.map((typeInfo, index) => (
                    <span key={index} className={`type ${typeInfo.type.name}`}>
                        {typeInfo.type.name.toUpperCase()}
                    </span>
                ))}
            </div>

            <div className="stats">
                {stats.map((stat, index) => (
                    <p key={index}>{stat.stat.name}: {stat.base_stat}</p>
                ))}
            </div>

            <div className="moves">
                <h3>Moves</h3>
                <ul>
                    {moves.slice(0, 5).map((move, index) => (
                        <li key={index}>{move.move.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PokemonCard;