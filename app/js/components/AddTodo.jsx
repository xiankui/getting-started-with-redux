/**
 * extract AddTodo Component
 */
import React from 'react';
import { connect } from 'react-redux';

let input;
let nextTodoId = 0;

const AddTodo = ({
	dispatch
}) => (
	<div>
		<input ref={node => {input = node}} />
		<button onClick={() => {
			dispatch({
		    type: 'ADD_TODO',
		    id: nextTodoId++,
		    text: input.value
			})

			input.value = '';
		}}>Add Todo</button>
	</div>
)



// export default connect(
// 	state => {
// 		return {}
// 	},
// 	dispatch => {
// 		return { dispatch }
// 	}
// )(AddTodo)

export default connect()(AddTodo);

// class AddTodo extends Component {
// 	constructor(props) {
// 	  super(props);
	
// 	  this.input = null;
// 	  this.nextTodoId = 0;
// 	}

// 	addTodo() {
// 		this.context.store.dispatch({
//       type: 'ADD_TODO',
//       id: this.nextTodoId++,
//       text: this.input.value
//     });
// 		this.input.value = '';
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<input ref={node => {this.input = node}} />
// 				<button onClick={this.addTodo.bind(this)}>Add Todo</button>
// 			</div>
// 		)
// 	}
// }

// AddTodo.contextTypes = {
//   store: React.PropTypes.object
// }