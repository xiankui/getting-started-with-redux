/**
 * chapter05: Avoiding Array Mutations
 */

import React from 'react';
import ReactDOM from 'react-dom';

// create store first
import { createStore } from 'redux';

// a reducer
// const counter = (state = [1, 3, 5], action) => {
// 	Object.freeze(state);
// 	let len = state.length;
// 	switch (action.type) {
// 		case 'PUSH':
// 			state.push(len*2 + 1)
// 			return state;
// 		case 'SPLICE':
// 			state.splice(len - 1, 1);
// 			return state;
// 		default: 
// 			return state;
// 	}
// }

const counter = (state = [1, 3, 5], action) => {
	Object.freeze(state); // this is default, because of state track and virtue dom diff
	let len = state.length;
	switch (action.type) {
		case 'PUSH':
			return [
				...state,
				len * 2 + 1,
			];
		case 'SPLICE':
			return [
				...state.slice(0, len-1)
			];
		default: 
			return state;
	}
}

// createStore
const store = createStore(counter);

// React render like function
const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => {
	console.log('component render ***')
	return (
	  <div>
	    <h1>{value}</h1>
	    <button onClick={onIncrement}>+</button>
	    <button onClick={onDecrement}>-</button>
	  </div>
	);
}

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState().join(', ')}
      onIncrement={() =>
        store.dispatch({
          type: 'PUSH'
        })
      }
      onDecrement={() =>
        store.dispatch({
          type: 'SPLICE'
        })
      }
    />,
    document.getElementById('root')
  );
}

render();

// everytime store.dispatch, subscribe called
store.subscribe(render)

