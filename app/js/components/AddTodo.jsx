/**
 * extract AddTodo Component
 */
import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

let input;

const AddTodo = ({
	addTodo
}) => (
	<div>
		<input ref={node => {input = node}} />
		<button onClick={() => {
			addTodo(input.value);
			input.value = '';
		}}>Add Todo</button>
	</div>
)

const mapDispatchToProps = (dispatch) => {
	return {
		addTodo: (text) => {
			dispatch(addTodo(text))
		}
	}
}

export default connect(
	state => {
		return {}
	},
	mapDispatchToProps
	)(AddTodo);

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