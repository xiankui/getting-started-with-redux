/**
 * chapter24: Generating Containers with connect() from React Redux (FooterLink)
 */

import React from 'react';
import ReactDOM from 'react-dom';

import store from './store';
import { Provider } from 'react-redux';

import TodoList from './components/TodoList.jsx';
import AddTodo from './components/AddTodo.jsx';
import Footer from './components/Footer.jsx';


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


