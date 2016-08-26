/**
 * extract TodoList Component
 */
import React from 'react';
import { connect } from 'react-redux';

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
// class VisibleTodoList extends Component {
//   componentDidMount() {
//   	console.log('context', this.context)
//   	const {store} = this.context;
//     this.unsubscribe = store.subscribe(() =>
//       this.forceUpdate()
//     );
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//   }

//   render() {
//     // const props = this.props;
//     const {store} = this.context;
//     const state = store.getState();

//     return (
//       <TodoList
//         todos={
//           getVisibleTodos(
//             state.todos,
//             state.visibilityFilter
//           )
//         }
//         onTodoClick={id =>
//           store.dispatch({
//             type: 'TOGGLE_TODO',
//             id
//           })
//         }
//       />
//     );
//   }
// }

// VisibleTodoList.contextTypes = {
//   store: React.PropTypes.object
// }

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
          t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
          t => !t.completed
      );
  }
}

/**
 * everytime dispatch happend, re-return todos
 */
const mapStateToProps = (
  state
) => {
  console.log('mapStateToProps state *** ', state)
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
};

const mapDispatchToProps = (
  dispatch
) => {
  console.log('mapDispatchToProps dispatch ****')
  return {
    onTodoClick: (id) => {
      dispatch({
      	type: 'TOGGLE_TODO',
      	id
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

/**
 * @connect
 * @1. connect state and dispatch to container component as explicitly props.
 * @2. everytime dispatch happend, re-called mapStateToProps to re-render the container component.
 */