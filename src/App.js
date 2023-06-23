import { useReducer } from 'react';
import './App.css';
import {snacks} from './data/snacks-data.js';

function App() {


  const reducer = (state, action) => {
    switch(action.type){
      case "SEARCH":
        console.log(action.value)
        if(action.value === "")
          return {...state, snacksList: snacks}
        else
          return {...state, searchText: action.value, snacksList: ([...snacks.filter((x) => x.product_name.toLowerCase().includes(action.value.toLowerCase())), ...snacks.filter((x) => x.ingredients.toString().toLowerCase().includes(action.value.toLowerCase()))])}

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
            <th><a href='' onClick={() => dispatch({type: "SORT", value: "product_name"})}>Product Name</a></th>
            <th><a href='' onClick={() => dispatch({type: "SORT", value: "product_weight"})}>Product Weight</a></th>
            <th><a href='' onClick={() => dispatch({type: "SORT", value: "price"})}>Price (INR)</a></th>
            <th><a href='' onClick={() => dispatch({type: "SORT", value: "calories"})}>Calories</a></th>
            <th><a href='' onClick={() => dispatch({type: "SORT", value: "ingredients"})}>Ingredients</a></th>
            </tr>
          </thead>

            <tbody>
            {state.snacksList.map((x) => {
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
