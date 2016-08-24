/**
 * chapter23: Generating Containers with connect() from React Redux (AddTodo)
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import store from './store';
import { Provider } from 'react-redux';

import TodoList from './components/TodoList.jsx';
import AddTodo from './components/AddTodo.jsx';


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
    <TodoList />
    <Footer />
  </div>
);


// const render = () => {
  ReactDOM.render(
    <Provider store={store}>
    	<TodoApp />
    </Provider>,
    document.getElementById('root')
  );
// }

// render();


