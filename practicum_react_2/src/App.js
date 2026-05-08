import './CSS/App.css';
import games from './data.js';
import Table from './components/Table.js';

function App() {
  return (
    <div className="App">
       <h3>Топ игр</h3>
       <Table data={ games } amountRows="15" pagination="1"/>
    </div>
  );
}

export default App;