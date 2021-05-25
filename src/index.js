import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppProvider from './context';
import {GlobalStyle} from './globalStyles';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
      <GlobalStyle />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

