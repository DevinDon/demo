import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Router></Router>
    </BrowserRouter>
  );
}

export default App;
