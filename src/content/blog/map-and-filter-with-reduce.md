---
author: Miloshinjo
pubDatetime: 2023-12-10T15:22:00Z
title: Reverse engineering .map and .filter with .reduce
postSlug: map-and-filter-with-reduce
featured: true
draft: false
tags:
  - javascript
  - typescript
  - reverse-engineering
description:
  We'll be implementing JavaScirpt's .map and .filter array methods using .reduce.
---

If you have been using **.map**, **.filter** and **.reduce** in your code, then you have done functional programming.
Without going in depth what functional programming is, we'll do a little excercise in it.

The **.reduce** can be seen as the **core** method of functional programming in JavaScript, and itself can be used to create other array functions, like **.map** and **.filter**.

So this is the challenge, we are going to create our own map and filter functions using **.reduce**.

I will presume that you know how to use all of the functions mentioned here, but if you don't, you can read up on them on these links - [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce), [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).

> In short, `.reduce` takes an array, does something with it, and returns a single value. Which value that is, depends on us.

## Table of contents

## .map

`map` is a an `Array` method that takes in a callback function as an argument which it calls for every element in the array. That callback function itself can takes in three arguments, _(element, index, array)_. For every element in the array, the callback function is called once and it returns the new element for each original array elements, thus creating a new array with the same length. Does not mutate the original array.

In code:

```ts
// Array we want to map over
const numbers: Array<number> = [1, 2, 3];

// All values in the array doubled
const doubled: Array<number> = numbers.map(number => number * 2);

console.log(doubled); // [2, 4, 6]
```

So let's now build the map method as it never existed using `reduce`. A few rules:

- We must get the new array with the same length
- We can't mutate the original array
- We must use Array.reduce

```ts
// index.ts

// For Typescript, declare a methods on a global Array interface
// We dont want to overwrite native .map method, so we will create a new one
// on the Array prototype.
declare interface Array<T> {
  ourMap<R>(callback: (element: T, index: number, array: T[]) => R): R[];
}

// Step 1: We make a custom method on the Array prototype
// ⚠️ this is for excercise purposes only
// ⚠️ think twice before trying something like this on a real project
// do not use arrow funtion here because it has different 'this' binding
Array.prototype.ourMap = function <T, R>(
  // Typescript tip: If you need to type out "this", you can write a type
  // for it as the first argument of a function.
  this: T[],
  callback: (value: T, index: number, array: T[]) => R
): R[] {
  // Step 2: Return an empty array if iterating over empty array
  // ℹ️ The `this` keyword will point to our array in this case
  if (this.length === 0) {
    return [];
  }

  // Step 3: Now we use reduce
  return this.reduce((total, current, index, array) => {
    // for every element invoke the callback function
    // also provide the index and the full array
    // (map has that feature too, so we need to include it)
    total.push(callback(current, index, array));

    // return the new array in the end
    return total;
  }, []); // empty array as initial value of the total

  // Define a test array
  const numbers: Array<number> = [1, 2, 3];
  // Use ourMap on the array to double the numbers
  const doubled: Array<number> = numbers.ourMap(number => number * 2);
  // Log the result
  console.log(doubled); // [2, 4, 6]
};
```
> When you create methods on a prototype of an object, all objects that have that prototype will have access to that method. Still not recommended to do on real world projects but usefull to know.

Creating `map` with `reduce` was pretty straightforward. Our `reduce` had to take an initial value, an array in this case, and calls the callback function for each value, pushing the result to our `total` array. In the end, we just return the total array. We also provide the _index_ and the _full array_ as arguments to `.ourMap` method. Reduce doesn't mutate the original array, so our data remains immutable.

## .filter

`filter` is a an `Array` method that takes in a callback function as an argument which it calls for every element in the array. That callback function itself can takes in three arguments, _(element, index, array)_. For every element in the array, the callback function is called once, if it returns `true`, the element remains in the array, if it is `false`, the element is taken out of the array. Does not mutate the original array.

In code:

```ts
// Array we want to filter
const numbers: Array<number> = [1, 2, 3];

// Filtered array containing values less then 2
const lessThan2: Array<number> = numbers.filter(number => number < 2);

console.log(lessThan2); // [ 1 ]
```

So let's now build the filter method as it never existed using `reduce`. A few rules:

- We must get the new array with filtered values taken out
- We can't mutate the original array
- We must use Array.reduce

```ts
// index.ts

// For Typescript, declare a methods on a global Array interface
// We dont want to overwrite native .map method, so we will create a new one
// on the Array prototype.
declare interface Array<T> {
  ourFilter<R>(callback: (element: T, index: number, array: T[]) => R): R[];
}

// Step 1: We make a custom method on the Array prototype
// ⚠️ this is for excercise purposes only
// ⚠️ think twice before trying something like this on a real project
// do not use arrow funtion here because it has different 'this' binding
Array.prototype.ourFilter = function <T, R>(
    this: T[],
    callback: (value: T, index: number, array: T[]) => R
  ): R[] {
  // Step 2: Return an empty array if iterating over empty array
  // ℹ️ The `this` keyword will point to our array in this case
  if (this.length === 0) return [];

  // Step 3: Now we use reduce
  return this.reduce((total, current, i, array) => {
    // for every element, perform a check
    // if our callback returns true, we push the element into the
    // returned array. Else block is not needed.
    if (callback(current, i, array) === true) {
      total.push(current);
    }

    // return the new array in the end
    return total;
  }, []); // empty array as initial value of the total
};
```

Creating `filter` with reduce was not much more complicated then creating `map`. Again we start with an empty array and we just introduce the check to see if what we get is `true` or `false` and then populate the returned array.

## Recap

The goal of this excercise was to help us understand the power of **.reduce**. It can do almost anything with arrays and many functional programming array methods are based on it. Learning how to use it effectively will help a lot in many real world situations. As a bonus, we learnt how to type a `this` keyword with typescript and how to add a method to object's prototype.

So next time you have a big array problem in your code and you are looking for a solution, try using **.reduce**.

You can play around with the exercise yourself using this [StackBlitz URL](https://stackblitz.com/edit/map-and-filter-with-reduce?file=index.ts).

Thanks for reading.😊
