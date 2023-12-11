---
author: Miloshinjo
pubDatetime: 2023-12-10T22:22:00Z
title: Basic Redux reverse engineered
postSlug: recreate-redux
featured: true
draft: false
tags:
  - javascript
  - typescript
  - reverse-engineering
description:
  We'll be recreating the basic idea of the redux library, mostly used with React application.
---

Few years ago, when I was learning **redux**, we had an exercise to recreate it from scratch. The main intent was to learn how it works under the hood. I figured I'd do that again, since it was really fun and helped me understand how redux works under the hood.

I will assume you know about **reducers** and **actions** and have used redux before. So this is just an excercise in showing how redux might be set up under the hood.

## Creating the Store

The main redux function is `createStore` which gives us our unique app store, which holds our **state** and the methods we use. Whenever we want to add redux to our apps, we always have to set up the store first.

In our store, we need **state**, ability to **get state** and the ability to **update the state**.

> For the sake of simplicity, we are skipping the **subscribe** part of redux, which is responsible for listening for changes in state.

```ts
// index.ts

// We need to pass a reducer function as an argument
// Real redux will take many arguments,
// but we are going for simplicity here
function createStore(reducer) {
  // ⓵ INITIALIZE THE STATE
  let state;

  // ⓶ ABILITY TO GET STATE
  const getState = () => state;

  // ⓷  UPDATE THE STATE
  // we update the state using dispatch function
  // dispatch will just update the state
  //  by calling the reducer function
  const dispatch = (action = { type: null }) => {
    // this piece of code is for empty actions
    // they will return the default state
    if (!action) {
      state = reducer();
      return;
    }
    // invoke the reducer and return the new state
    state = reducer(state, action);
  };

  return {
    getState,
    dispatch
  };
}
```

## Using the Store

Now we can use our redux store using this code and use some basic redux actions.

```ts
// basic reducer function
const counterReducer = function(state = 0, action) {
  if (action.type === 'INCREMENT') {
    return state + 1;
  } else if (action.type === 'DECREMENT') {
    return state - 1;
  }
  // always return state as default
  return state;
};

const store = createStore(counterReducer);

// dispatch an empty action when
// initializing store to set the default state
// this is done under the hood, so I am using this workaround
store.dispatch();

console.log(store.getState()); // 0

store.dispatch({ type: 'INCREMENT' });

console.log(store.getState()); // 1

store.dispatch({ type: 'INCREMENT' });

console.log(store.getState()); // 2
```

This is very very basic redux implementation, which is meant to be a small coding excercise to try and recreate how a popular library works under the hood. The real implementation can be found on their github page.

P.S. If anyone knows a better way to read the default state from a reducer without invoking the `store.dispatch()`, please write to me and I'll change it here 😀