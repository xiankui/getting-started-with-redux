/**
 * chapter19: Passing the Store Down Explicitly(明确的) via Props
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// create a top level store with combineReducers
import { createStore, combineReducers } from 'redux';

// reducer composition with arrays
const todo = (state, action) => {
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


// another reducer
const visibilityFilter = (state = 'SHOW_ALL', action) => {
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

// extract presentational component Todo
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

// extract presentational component TodoList
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

// extract reactive component VisibleTodoList
class VisibleTodoList extends Component {
  componentDidMount() {
  	const {store} = this.props;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    // const props = this.props;
    const {store} = this.props;
    const state = store.getState();

    return (
      <TodoList
        todos={
          getVisibleTodos(
            state.todos,
            state.visibilityFilter
          )
        }
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
    );
  }
}

// extract reactive component AddTodo
class AddTodo extends Component {
	constructor(props) {
	  super(props);
	
	  this.input = null;
	  this.nextTodoId = 0;
	}

	addTodo() {
		this.props.store.dispatch({
      type: 'ADD_TODO',
      id: this.nextTodoId++,
      text: this.input.value
    });
		this.input.value = '';
	}

	render() {
		return (
			<div>
				<input ref={node => {this.input = node}} />
				<button onClick={this.addTodo.bind(this)}>Add Todo</button>
			</div>
		)
	}
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
		const { store } = this.props;
		// console.log('FilterLink componentDidMount')
    this.unsubscribe = store.subscribe(() => {
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
    const {store} = props;
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
const Footer = ({store}) => (
	<p>
	  Show:
	  {' '}
	  <FilterLink
	    filter='SHOW_ALL'
	    store={store}
	  >
	    All
	  </FilterLink>
	  {' '}
	  <FilterLink
	    filter='SHOW_ACTIVE'
	    store={store}
	  >
	    Active
	  </FilterLink>
	  {' '}
	  <FilterLink
	    filter='SHOW_COMPLETED'
	    store={store}
	  >
	    Completed
	  </FilterLink>
	</p>
)


/**
 * just pass props store
 */
const TodoApp = ({ store }) => (
  <div>
    <AddTodo store={store} />
    <VisibleTodoList store={store} />
    <Footer store={store} />
  </div>
);

const render = () => {
  ReactDOM.render(
    <TodoApp store={store} />,
    document.getElementById('root')
  );
}

render();

// everytime store.dispatch, subscribe called and rerender a new ui of current state
// Now the cycle can be repeated.
// store.subscribe(render)

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
  * @2. container (reactive) component (交互性)
  */


