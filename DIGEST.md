# Digest of React && Redux

React: respond or behave in a particular way in response to something. (from translate.google.cn)
以**特定**的方式对**某些东西**作出**回应或行为**。

## there principles of redux

* The Single Immutable State Tree (单一的不可变的状态树)
* Describing State Changes with Actions (用actions来描述状态的改变)
* The Reducer Function return the new state (reducer函数产生新的状态)

## store has 3 important methods:

* getState() to get the current state
* dispatch() to get a new state (or change the state)
* subscribe() everytime dispatch, subscribe is called

## Reducer Composition with Arrays

* split complex array state to litte.
* combine them with the same action that pass down.
* the aim is make reducer more smaller and readable.

##  Reducer Composition with Objects

* that must! remember, we can have one state only!
* once dispatch an action, every child reducer called to return a child state and then combine to the root state.
* so, different team members can work on different reducers that work with the same action.


## Provider from scratch

```
class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store // This corresponds to the `store` passed in as a prop
    };
  }
  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object
}
```

## connect

* connect state and dispatch to container component as explicitly props.
* everytime dispatch happend, re-called mapStateToProps; if the bind state changed, re-render the container component.