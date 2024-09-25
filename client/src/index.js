import React from 'react';
import ReactDOM from 'react-dom/client'; // Используем createRoot из react-dom/client
import App from './App';

const rootElement = document.getElementById('root'); // Ищем элемент с ID root
const root = ReactDOM.createRoot(rootElement); // Используем createRoot
root.render(<App />);
