/**
 * chapter06: Avoiding Object Mutations with Object.assign() and ...spread
 */

import React from 'react';
import ReactDOM from 'react-dom';

// create store first
import { createStore } from 'redux';

// a reducer
const list = [{
	id: 0,
	text: 'list 0',
	completed: false,
}, {
	id: 1,
	text: 'list 1',
	completed: false,
}];

const todos = (state = list, action) => {
	Object.freeze(state);
	switch (action.type) {
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

// React render like function
const Counter = ({
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
	  </div>
	);
}

const render = () => {
  ReactDOM.render(
    <Counter
      todos={store.getState()}
    />,
    document.getElementById('root')
  );
}

render();

// everytime store.dispatch, subscribe called
store.subscribe(render)

