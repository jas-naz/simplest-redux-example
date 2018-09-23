import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ConfigStore from "./configureStore"

// React component
class Counter extends Component {
	render() {
		const { value, onIncreaseClick, onDecreaseClick } = this.props
		return (
			<div>
				<div><span>{value}</span></div>
				<button onClick={onIncreaseClick}>+</button>
				<button onClick={onDecreaseClick}>-</button>
			</div>
		)
	}
}

Counter.propTypes = {
value: PropTypes.number.isRequired,
onIncreaseClick: PropTypes.func.isRequired,
onDecreaseClick: PropTypes.func.isRequired
}

// Action
const increaseAction = { type: 'increase' };
const decreaseAction = { type: 'decrease' };

// Reducer
function counter(state = { count: 0 }, action) {
	const count = state.count
	switch (action.type) {
		case 'increase':
			return { count: count + 1 }
		case 'decrease':
			return { count: count - 1 }
		default:
			return state
	}
}

// Persist
const persistor = ConfigStore.persistor

// Store
const store = createStore(counter)
// const store = ConfigStore.store

// Map Redux state to component props 
function mapStateToProps(state) {
	return {
		value: state.count
	}
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		onIncreaseClick: () => dispatch(increaseAction),
		onDecreaseClick: () => dispatch(decreaseAction)
	}
}

// Connected Component
const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(Counter)

// const App = () => {
// return (
// <Provider store={store}>
// <PersistGate loading={null} persistor={persistor}>
// <RootComponent />
// </PersistGate>
// </Provider>
// );
// };

// ReactDOM.render(
// 	<Provider store={store}>
// 		<PersistGate loading={null} persistor={ConfigStore.persistor}>
// 			<App />
// 		</PersistGate>
// 	</Provider>,
// 	document.getElementById('root')
// )
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
