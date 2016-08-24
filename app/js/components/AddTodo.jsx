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