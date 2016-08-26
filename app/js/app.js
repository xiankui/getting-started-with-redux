/**
 * chapter13: React Todo List Example (Toggling a Todo)
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// create a top level store with combineReducers
import { createStore, combineReducers } from 'redux';

// reducer composition with arrays
const todo = (state, action) => {
	Object.freeze(state);

	switch (action.type) {
		case 'ADD_TODO':
			return {
				id: action.id,
				text: action.text,
				completed: false,
			};

		case 'TOGGLE_TODO':
			if (state.id !== action.id) {
					return state;
				}

				return {
					...state,
					completed: !state.completed,
				}
		default: 
			return state;
	}
}

const todos = (state = [], action) => {
	Object.freeze(state);

	switch (action.type) {
		case 'ADD_TODO':
			return [
				...state,
				todo(undefined, action),
			];
		case 'TOGGLE_TODO':
			return state.map(t => todo(t, action));
		default: 
			return state;
	}
}


// To store this new information, we don't need to change the existing reducers.
const visibilityFilter = (state = 'SHOW_ALL', action) => {
	Object.freeze(state);
	switch (action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter;
		default: 
			return state;
	}
}


/**
 * now, we use our combineReducers
 */
const todoApp = combineReducers({
	todos,
	visibilityFilter
});

// createStore
const store = createStore(todoApp);

let nextTodoId = 0;

/**
 * a normal React Component, must have one method, called render.
 */
class TodoApp extends Component {
	render() {
		return (
			<div>
				<input ref={node => {this.input = node}} />

				<button onClick={() => {
					store.dispatch({
						type: 'ADD_TODO',
						id: nextTodoId++,
						text: this.input.value,
					})

					this.input.value = '';
				}}>Add Todo</button>
				<ul>
					{
						this.props.todos.map(todo => {
							return <li 
											key={todo.id}
											onClick={() => {
												store.dispatch({
													type: 'TOGGLE_TODO',
													id: todo.id,
												})
											}}
											style={{
												textDecoration: todo.completed ? 'line-through' : 'none'
											}}>{todo.text}</li>;
						})
					}
				</ul>
			</div>
		)
	}
}

const render = () => {
  ReactDOM.render(
    <TodoApp
      todos={store.getState().todos}
    />,
    document.getElementById('root')
  );
}

render();

// everytime store.dispatch, subscribe called and rerender a new ui of current state
// Now the cycle can be repeated.
store.subscribe(render)

