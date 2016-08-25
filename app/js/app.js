// a counter reducer
const counter = (state = 0, action) => {
	console.log('dispatch ***', action)
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// const { createStore } = Redux; // Redux CDN import syntax
import { createStore } from 'redux' // npm module syntax

const store = createStore(counter);

/**
 * store has 3 important methods:
 * getState()
 * dispatch()
 * subscribe()
 */
const render = () => {
	console.log('render ui ********')
 document.getElementById('root').innerText = store.getState();
};

store.subscribe(() => {
	console.log('subscribe *********')
	render();
});

render(); // calling once to render the initial state (0), then the subscribe will update subsequently

document.addEventListener('click', () => {
	console.log('click ********')
   store.dispatch({ type : 'INCREMENT' })
});

/**
 * lifecycle
 * @click => dispatch => change state
 * @dispatch => subscribe => render
 * @getState
 */