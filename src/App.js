import { useReducer } from 'react';
import './App.css';
import {snacks} from './data/snacks-data.js';

function App() {


  const reducer = (state, action) => {
    switch(action.type){
      case "SEARCH":
        console.log(action.value)
        if(action.value === "")
          {const result = snacks;
          return {...state, snacksList: result}}
        else
          {
            
            const result1 = snacks.filter((x) => x.product_name.toLowerCase().includes(action.value.toLowerCase()));
            const result2 = snacks.filter((x) => x.ingredients.toString().toLowerCase().includes(action.value.toLowerCase()));
            const result1Ids = result1.map((x) => x.id);
            const finalResult2 = result2.filter((x) => !result1Ids.includes(x.id));

            return {...state, searchText: action.value, snacksList: ([...result1, ...finalResult2])}}

      case "SORT":
          return {...state, snacksList: state.snacksList.sort((a,b) => a.action.value - b.action.value)}

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    snacksList: snacks
  });


  return (
    <div className="App d-block">
        <input type='text' id="search" placeholder='search with product name or ingredients...' onChange={(event) => dispatch({type: "SEARCH", value: event.target.value})}/>
        <table>
          <thead>
            <tr>
            <th onClick={() => dispatch({type: "SORT", value: "product_name"})}>Product Name</th>
            <th onClick={() => dispatch({type: "SORT", value: "product_weight"})}>Product Weight</th>
            <th onClick={() => dispatch({type: "SORT", value: "price"})}>Price (INR)</th>
            <th onClick={() => dispatch({type: "SORT", value: "calories"})}>Calories</th>
            <th onClick={() => dispatch({type: "SORT", value: "ingredients"})}>Ingredients</th>
            </tr>
          </thead>

            <tbody>
              {state.snacksList.length > 0 && state.snacksList.map((x) => {
                return(
                  <tr key={x.id}><td>{x.product_name}</td><td>{x.product_weight}</td><td>{x.price}</td><td>{x.calories}</td><td>{x.ingredients.toString()}</td></tr>
                )
              })}
            </tbody>
        </table>
    </div>
  );
}

export default App;
