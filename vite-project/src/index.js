import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Algemene stijlen (optioneel)
import Pokedex from './Pokedex';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <Pokedex />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();