import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='root-wrapper'>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </div>

);

document.title = 'Skin Care Store';
reportWebVitals();
