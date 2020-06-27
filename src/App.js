import React from 'react';
import styled from 'styled-components';
import './App.css';

const TickTacToeStyle = styled.td`
  width: 40px;
  height: 40px;
  color: black;
  border: solid black 1px;
`;

function App() {
  return (
    <div className="App">
      <tr>
        <TickTacToeStyle/>
        <TickTacToeStyle/>
        <TickTacToeStyle/>
      </tr>
      <tr>
        <TickTacToeStyle/>
        <TickTacToeStyle/>
        <TickTacToeStyle/>
      </tr>
      <tr>
        <TickTacToeStyle/>
        <TickTacToeStyle/>
        <TickTacToeStyle/>
      </tr>   
    </div>
  );
}

export default App;
