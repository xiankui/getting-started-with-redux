/**
 * extract FooterLink Component
 */
import React from 'react';
import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';

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
// class FilterLink extends Component {
// 	componentDidMount() {
// 		const { store } = this.context;
// 		// console.log('FilterLink componentDidMount')
//     this.unsubscribe = store.subscribe(() => {
//       this.forceUpdate()
//     });
//   }

//   // Since the subscription happens in `componentDidMount`,
//   // it's important to unsubscribe in `componentWillUnmount`.
//   componentWillUnmount() {
//   	// console.log('FilterLink componentWillUnmount')
//     this.unsubscribe(); // return value of `store.subscribe()`
//   }
//   render () {
//     const props = this.props;
//     const {store} = this.context;
//     // this just reads the store, is not listening
//     // for change messages from the store updating
//     const state = store.getState();

//     return (
//       <Link
//         active={
//           props.filter ===
//           state.visibilityFilter
//         }
//         onClick={() =>
//           store.dispatch({
//             type: 'SET_VISIBILITY_FILTER',
//             filter: props.filter
//           })
//         }
//       >
//         {props.children}
//       </Link>
//     );
//   }
// }

// FilterLink.contextTypes = {
//   store: React.PropTypes.object
// }



const mapStateToProps = (
	state,
	ownProps
) => {
	return {
		active: ownProps.filter === state.visibilityFilter
	}
}

const mapDispatchToProps = (
	dispatch,
	ownProps
) => {
	return {
		onClick: () => {
			dispatch(setVisibilityFilter(ownProps.filter))
		}
	}
}

const FilterLink = connect(
	mapStateToProps,
	mapDispatchToProps
)(Link);



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

export default Footer;