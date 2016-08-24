/**
 * the AppRoot will be render
 */
import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import AddTodo from './AddTodo.jsx';
import TodoList from './TodoList.jsx';
import Footer from './Footer.jsx';

const TodoApp = () => (
	<div>
	  <AddTodo />
	  <TodoList />
	  <Footer />
	</div>
)

export default (
	<Provider store={store}>
		<TodoApp />
	</Provider>
);