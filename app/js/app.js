/**
 * chapter07: Writing a Todo List Reducer
 */

import React from 'react';
import ReactDOM from 'react-dom';

// create store first
import { createStore } from 'redux';

// a reducer
const todos = (state = [], action) => {
	Object.freeze(state);
	switch (action.type) {
		case 'ADD_TODO':
			return [
				...state,
				{
					id: action.id,
					text: action.text,
					completed: false,
				}
			];
		case 'TOGGLE_TODO':
			return state.map(todo => {
				if (action.id !== todo.id) {
					return todo;
				}

				return {
					...todo,
					completed: !todo.completed,
				}
			});
		default: 
			return state;
	}
}

// createStore
const store = createStore(todos);

var count = 0,
		redux = ['r', 'e', 'd', 'u', 'x'];

// React render like function
const Todos = ({
  todos,
}) => {
	let list = todos.map(todo => {
		return <li 
			key={todo.id} 
			style={{fontSize: 16, color: todo.completed ? '#aaa' : '#00a'}}>
				<a onClick={() => store.dispatch({
					type: 'TOGGLE_TODO',
					id: todo.id,
				})}>{todo.text}</a>
			</li>
	})

	return (
	  <div>
	    <ul>
	    	{list}
	    </ul>
	    <button onClick={() => {
	    	let _text = redux.slice().sort(function() {
				  return .5 - Math.random();
				});
	    	store.dispatch({
		    	type: 'ADD_TODO',
		    	id: count,
		    	text: _text.join('')
		    });

		    count++;
	    }}>add todo</button>
	  </div>
	);
}

const render = () => {
  ReactDOM.render(
    <Todos
      todos={store.getState()}
    />,
    document.getElementById('root')
  );
}

render();

// everytime store.dispatch, subscribe called
store.subscribe(render)

