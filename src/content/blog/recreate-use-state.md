---
author: Miloshinjo
pubDatetime: 2023-12-11T22:49:00Z
title: Reverse engineering useState
postSlug: reverse-engineer-use-state
featured: true
draft: false
tags:
  - javascript
  - typescript
  - react
  - reverse-engineering
description:
  We'll be recreating React's useState hook using React's useReducer hook
---

In this post we'll be doing some more reverse engineering, this time, we'll create the `useState` React hook using `useReducer` hook.

Within React core library, `useState` is implemented using `useReducer`, which you can check out by diving into their code. We won't be doing that, as we will try to do it on our own knowing the rules of `useState`. Goal of this exercise is to understand both `useReducer` and `useState` a bit better.

Rules of `useState` are as follows:
- `useState` is a function that takes 1 argument - `initialState`.
- It returns an array with 2 elements, first element is the `state` itself, and the second element is the `setState` function that changes the state.
- After state is changed, app should re-render (`useReducer` already takes care of that).
- It should be type safe, meaning we can pass in whatever type we want and we will have full type safety.

First we need to create a `reducer` function to pass to the `useReducer` hook.

```ts
// useState.ts

// Define a reducer function for useReducer hook
function reducer<T>(state: T, updater: ((prev: T) => T) | T): T {
  // Check if user passed in a updater as a functiuon
  if (typeof updater === 'function') {
    // Have to cast here to apease compiler. Help needed: Avoid casting
    return (updater as (prev: T) => T)(state);
  }

  // If user passed updater as a value, just return it
  return updater;
}
```

> If you are wondering what the `T` stands for, it is a generic type in typescript, meaning that we don't know the type ahead of time, but we will know it when we call the function based on the function arguments we pass in.

After this is done, we can now create our custom hook.

```ts
// useState.ts

// Define our "custom" useState hook
export function useState<T>(initialState?: T) {
  // useReducer will return [state, dispatch],
  // which is what useState returns as well.
  return useReducer(reducer<T>, initialState);
}
```

That's it. This is our fully type safe `useState` hook which can be used in place of React's native one. Doesn't mean we should do it, but this exercise was fun way to practice react hooks with some typescript.

You can play around with the exercise yourself and check it out in action using this [StackBlitz URL](https://stackblitz.com/edit/stackblitz-starters-xzmjzq?file=src%2Fhooks%2FuseState.ts).

Thanks for reading.😊
