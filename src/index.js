import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import theme from './theme';

export const ThemeContext = createContext({ theme })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeContext.Provider value={theme}>
      <App />
    </ThemeContext.Provider>
  </React.StrictMode>
);