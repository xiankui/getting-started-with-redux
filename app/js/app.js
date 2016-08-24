/**
 * chapter17: Extracting Container Components (FilterLink)
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
 * combineReducers to get a root reducer
 */
const todoApp = combineReducers({
	todos,
	visibilityFilter
});

// createStore
const store = createStore(todoApp);

// a normal function
// base on todos & filter, get visible todos
const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      // Use the `Array.filter()` method
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
  }
}

// extract component Todo
const Todo = ({
	onClick,
	completed,
	text
}) => (
	<li
		onClick={onClick}
		style={{
			textDecoration: completed ? 'line-through' : 'none'
		}}>
		{text}
	</li>
)

// extract component TodoList
const TodoList = ({
	todos,
	onTodoClick
}) => (
	<ul>
		{
			todos.map(todo => 
				<Todo
					key={todo.id}
					{...todo}
					onClick={() => onTodoClick(todo.id)} />
			)
		}
	</ul>
)

// extract component AddTodo
const AddTodo = ({
	onAddClick
}) => {
	let input;

	return (
		<div>
			<input ref={node => {input = node}} />

			<button onClick={() => {
				onAddClick(input.value);
				input.value = '';
			}}>Add Todo</button>
		</div>
	)
}


// extract presentational component Link
// 提取成表象组件，没有逻辑，只是直观的渲染
const Link = ({
	active,
	onClick,
	children
}) => {
	if (active) {
		return <span>{children}</span>
	}

	return (
		<a 
			href='#'
			onClick={(e) => {
			 	e.preventDefault();
			 	onClick();
			}}
		>
			 {children}
		</a>
	)
}

// extract reactive component FilterLink
// 提取成交互组件
class FilterLink extends Component {
	componentDidMount() {
		// console.log('FilterLink componentDidMount')
    this.unsubscribe = store.subscribe(() => {
    	console.log('FilterLink forceUpdate')
      this.forceUpdate()
    });
  }

  // Since the subscription happens in `componentDidMount`,
  // it's important to unsubscribe in `componentWillUnmount`.
  componentWillUnmount() {
  	// console.log('FilterLink componentWillUnmount')
    this.unsubscribe(); // return value of `store.subscribe()`
  }
  render () {
    const props = this.props;
    // this just reads the store, is not listening
    // for change messages from the store updating
    const state = store.getState();

    return (
      <Link
        active={
          props.filter ===
          state.visibilityFilter
        }
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </Link>
    );
  }
}

// extract presentational component Footer
const Footer = () => (
	<p>
	  Show:
	  {' '}
	  <FilterLink
	    filter='SHOW_ALL'
	  >
	    All
	  </FilterLink>
	  {' '}
	  <FilterLink
	    filter='SHOW_ACTIVE'
	  >
	    Active
	  </FilterLink>
	  {' '}
	  <FilterLink
	    filter='SHOW_COMPLETED'
	  >
	    Completed
	  </FilterLink>
	</p>
)



let nextTodoId = 0;

/**
 * a normal React Component, must have one method, called render.
 */
class TodoApp extends Component {
	render() {
		let {
			todos,
			visibilityFilter
		} = this.props;

		let visibleTodos = getVisibleTodos(todos, visibilityFilter)

		return (
			<div>
				<AddTodo
					onAddClick={text => {
						store.dispatch({
							type: 'ADD_TODO',
							id: nextTodoId++,
							text
						})
					}} />

				<TodoList
					todos={visibleTodos}
					onTodoClick={id => {
						store.dispatch({
							type: 'TOGGLE_TODO',
							id
						})
					}} />

				<Footer />				
			</div>
		)
	}
}

const render = () => {
	console.log('render ***')
  ReactDOM.render(
    <TodoApp
      {...store.getState()}
    />,
    document.getElementById('root')
  );
}

render();

// everytime store.dispatch, subscribe called and rerender a new ui of current state
// Now the cycle can be repeated.
store.subscribe(render)

/**
 * @remind always
 * @1. one state map one UI
 * @2. any dispatch function calls the root reducer, return a new state
 */

/**
 * @lifecycle
 * @1. when createStore(), state had been dispatched as default already.
 * @2. when render(), @@rudex/INIT state will be render UI
 * @3. when any dispatch function calls, will return a new state, 
 *		 and then rerender UI base on the new state, becauseof the store.subscribe()
 */

 /**
  * @two type of component 
  * @1. presentational component (表象、直觉)
  * @2. reactive component (交互性)
  */


