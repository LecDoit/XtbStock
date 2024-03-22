import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StocksContextProvider } from './context/StocksContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <StocksContextProvider>
        <App />
    </StocksContextProvider>


);

