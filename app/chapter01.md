# There principles of redux

## 01. The Single Immutable State Tree (单一的不可变的状态树)
 * The entire state of the application will be represented by one JavaScript object.

## 02. Describing State Changes with Actions (用actions来描述状态的改变)
 * the state tree is read only.
 * Any time you want to change the state, you have to dispatch an action.

## 03. The Reducer Function
 * to describe state mutations you have to write a function that takes the previous state of the app and the action being dispatched, then returns the next state of the app. This function is called the Reducer.
 * Reducer is pure function.

---

## Pure and Impure Functions
 * Pure:

 ```
 function square(x) {
   return x * x;
 }
 function squareAll(items) {
   return items.map(square);
 }
 ```

* Impure

```
function square(x) {
  updateXInDatabase(x);
  return x * x;
}
function squareAll(items) {
  for (let i = 0; i < items.length; i++) {
    items[i] = square(items[i]);
  }
}
```