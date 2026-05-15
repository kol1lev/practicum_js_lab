import './CSS/App.css';
import games from './data.js';
import Table from './components/Table.js';
import { useState } from 'react';
import Chart from './components/Chart.js';

function App() {
  let [currentData, setCurrentData] = useState(games);
  return (
    <div className="App">
       <h3>Топ игр</h3>
       <Chart data={currentData}/>
       <Table data={ games } amountRows="15" pagination="1" setCurrentData = {setCurrentData}/>
    </div>
  );
}

export default App;