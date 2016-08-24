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
 * combineReducers to get a root reducer
 */
const todoApp = combineReducers({
	todos,
	visibilityFilter
});

// createStore
export default createStore(todoApp);
