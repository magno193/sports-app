import React from 'react';
import Login from './pages/Login/'
import Dashboard from './pages/Dashboard/'
import {Container} from 'reactstrap'
import './App.css';

function App() {
  return (
    <Container>
          <Login />
          <Dashboard />
    </Container>
  );
}

export default App;
