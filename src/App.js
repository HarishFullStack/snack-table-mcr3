import './App.css';
import {snacks} from './data/snacks-data.js';

function App() {
  return (
    <div className="App">
      <table>
        {snacks.map((x) => {
          return(
            <tr><td>{x.product_name}</td><td>{x.product_weight}</td><td>{x.price}</td><td>{x.calories}</td><td>{x.ingredients}</td></tr>
          )
        })}
      </table>
    </div>
  );
}

export default App;
