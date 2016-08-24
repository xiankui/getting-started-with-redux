/**
 * chapter22: Generating Containers with connect() from React Redux (VisibleTodoList)
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import store from './store';
import { Provider } from 'react-redux';

import VisibleTodoList from './components/TodoList.jsx';



// extract reactive component AddTodo
class AddTodo extends Component {
	constructor(props) {
	  super(props);
	
	  this.input = null;
	  this.nextTodoId = 0;
	}

	addTodo() {
		this.context.store.dispatch({
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

AddTodo.contextTypes = {
  store: React.PropTypes.object
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
		const { store } = this.context;
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
    const {store} = this.context;
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

FilterLink.contextTypes = {
  store: React.PropTypes.object
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


/**
 * just pass props store
 */
const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);


/**
 * define a Provider component to pass store to every child component through Context implicity
 * but use the context feature is not a good idea in React philosophy.
 */
// class Provider extends Component {
//   getChildContext() {
//     return {
//       store: this.props.store // This corresponds to the `store` passed in as a prop
//     };
//   }
//   render() {
//     return this.props.children;
//   }
// }

// Provider.childContextTypes = {
//   store: React.PropTypes.object
// }

// const render = () => {
  ReactDOM.render(
    <Provider store={store}>
    	<TodoApp />
    </Provider>,
    document.getElementById('root')
  );
// }

// render();

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
  * @2. reactive component (交互性)
  */


