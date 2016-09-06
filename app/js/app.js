/**
 * chapter05: Avoiding Object Mutations with Object.assign() and ...spread
 */

import React from 'react';
import ReactDOM from 'react-dom';

// create store first
import { createStore } from 'redux';

var initState = {
  id: 0,
  text: 'Learn Redux',
  completed: false
};

// a reducer
// const counter = (state = initState, action) => {
//   Object.freeze(state); // this is default, because of state track and virtue dom diff
//   let len = state.length;
//   switch (action.type) {
//     case 'TOGGLE_TODO':
//       state.completed = !state.completed
//       return state;
      
//     default: 
//       return state;
//   }
// }

const counter = (state = initState, action) => {
	Object.freeze(state); // this is default, because of state track and virtue dom diff
	let len = state.length;
	switch (action.type) {
		case 'TOGGLE_TODO':
			return {
        ...state,
        completed: !state.completed
      }
		
		default: 
			return state;
	}
}

// createStore
const store = createStore(counter);

// React render like function
const Counter = ({
  todo,
  onToggle,
}) => {
	console.log('component render ***')
	return (
	  <div>
	    <h1 style={{
        textDecoration: todo.completed ? 'line-through' : 'none',
        color: todo.completed ? '#aaa' : '#333'
      }}>{todo.text}</h1>
	    <button onClick={onToggle}>toggle todo</button>
	  </div>
	);
}

const render = () => {
  ReactDOM.render(
    <Counter
      todo={store.getState()}
      onToggle={() =>
        store.dispatch({
          type: 'TOGGLE_TODO'
        })
      }
    />,
    document.getElementById('root')
  );
}

render();

// everytime store.dispatch, subscribe called
store.subscribe(render)

