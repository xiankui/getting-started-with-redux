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