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
            
            const productNameMatch = snacks.filter((x) => x.product_name.toLowerCase().includes(action.value.toLowerCase()));
            const ingredientsMatch = snacks.filter((x) => x.ingredients.toString().toLowerCase().includes(action.value.toLowerCase()));
            const productNameMatchIds = productNameMatch.map((x) => x.id);
            const uniqueIngredientsMatch = ingredientsMatch.filter((x) => !productNameMatchIds.includes(x.id));

            return {...state, searchText: action.value, snacksList: ([...productNameMatch, ...uniqueIngredientsMatch])}}

      case "SORT":
          if(action.value === "product_name")
            return {...state, snacksList: state.snacksList.sort((a,b) => a.product_name > b.product_name ? -1 : a.product_name < b.product_name ? 1 : 0)}
          if(action.value === "product_weight")
            return {...state, snacksList: state.snacksList.sort((a,b) => a.product_weight > b.product_weight ? -1 : a.product_weight < b.product_weight ? 1 : 0)}
          if(action.value === "price")
            return {...state, snacksList: state.snacksList.sort((a,b) => a.price > b.price ? -1 : a.price < b.price ? 1 : 0)}
          if(action.value === "calories")
            return {...state, snacksList: state.snacksList.sort((a,b) => a.calories > b.calories ? -1 : a.calories < b.calories ? 1 : 0)}
          if(action.value === "product_name")
            return {...state, snacksList: state.snacksList.sort((a,b) => a.ingredients.toString() > b.ingredients.toString() ? -1 : a.ingredients.toString() < b.ingredients.toString() ? 1 : 0)}

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
