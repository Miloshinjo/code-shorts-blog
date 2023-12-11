---
author: Miloshinjo
pubDatetime: 2023-12-10T22:22:00Z
title: Reverse engineering Redux
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

// Basic state type
type State = {
  count: number;
};

// Basic Action type
type Action = {
  type: string;
  payload?: any;
};

// Basic reducer type
type Reducer = (state: State, action: Action | null) => State;

// We have to provide our initial state for the app
const defaultState: State = {
  count: 0,
};

// We need to pass a reducer function as an argument
// Real redux will take many arguments,
// but we are going for simplicity here
function createStore(
  reducer: Reducer
): [() => State, (action: Action) => void] {
  // ⓵ INITIALIZE THE STATE
  let state: State = reducer(defaultState, {
    type: null,
  });

  // ⓶ ABILITY TO GET STATE
  function getState(): State {
    return state;
  }

  // ⓷  UPDATE THE STATE
  // we update the state using dispatch function
  // dispatch will just update the state
  // by calling the reducer function
  function dispatch(action: Action) {
    // invoke the reducer and return the new state
    state = reducer(state, action);
  }

  // We return an array with 2 values - 1. getState,
  // and the 2. dispatch function for our actions.
  return [getState, dispatch];
}
```

## Using the Store

Now we can use our redux store using this code and use some basic redux actions.

```ts
// index.ts

// Here we implement the reducer function that will
// be responsible for our state changes
const counterReducer = function (state: State, action: Action) {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        ...state,
        count: state.count + 1,
      };
    }
    case 'DECREMENT': {
      return {
        ...state,
        count: state.count - 1,
      };
    }
    // Always return previous state as if
    // action type is not defined
    default: {
      return state;
    }
  }
};

// Initiate our store
const [getState, dispatch] = createStore(counterReducer);

// Check for our state value
console.log(getState()); // { count: 0 }

// Dispatch an INCREMENT action
dispatch({ type: 'INCREMENT' });

// Check for our state value again
console.log(getState()); // { count: 1 }

// Dispatch another INCREMENT action
dispatch({ type: 'INCREMENT' });

// Check for our state value again
console.log(getState()); // { count: 2 }

// Dispatch a DECREMENT action
dispatch({ type: 'DECREMENT' });

// Check for our state value again
console.log(getState()); // { count: 1 }

```

This is very very basic redux implementation, which is meant to be a small coding excercise to try and recreate how a popular library works under the hood. The real implementation can be found on their github page.

Thanks for reading.😊
