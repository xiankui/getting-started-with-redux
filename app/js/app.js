/**
 * chapter04: React Counter Example
 */

import React from 'react';
import ReactDOM from 'react-dom';

// create store first
import { createStore } from 'redux';

// a reducer
const counter = (state = 0, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default: 
			return state;
	}
}

// createStore
const store = createStore(counter);

// a presentational(表象、直觉) component
const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() =>
        store.dispatch({
          type: 'INCREMENT'
        })
      }
      onDecrement={() =>
        store.dispatch({
          type: 'DECREMENT'
        })
      }
    />,
    document.getElementById('root')
  );
}

render(); // dispatch @@redux/INIT

// everytime store.dispatch, subscribe called
store.subscribe(render)

/**
 * lifecycle
 * 1. dispatch happend
 * 2. reducer called
 * 3. state changed
 * 4. subscribe listeners called
 * 5. rerender
 */
