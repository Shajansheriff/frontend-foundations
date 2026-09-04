---
title: "Functions & Objects"
order: 2
---

## Function declaration vs function expression?
**Answer:** A function declaration is declared with `function name()` and is available before its line in the scope. A function expression stores a function value in a variable and follows that variable’s initialization rules.
**Remember:** Declarations hoist differently from expressions.

## What are first-class functions?
**Answer:** Functions are values in JavaScript. They can be stored in variables, passed as arguments, returned from functions, and placed in objects.
**Remember:** Functions can travel like data.

## What is a higher-order function?
**Answer:** A higher-order function takes a function as an argument, returns a function, or both.
**Remember:** `map`, `filter`, and function factories are common examples.

## What is a callback?
**Answer:** A callback is a function passed to other code to be called later or when an operation reaches a certain point.
**Remember:** Pass behavior into another function.

## What is a pure function?
**Answer:** A pure function returns the same output for the same inputs and does not create observable side effects.
**Remember:** Same input → same output, no outside changes.

## What is currying?
**Answer:** Currying transforms a function that takes multiple arguments into a chain of functions that each take one argument.
**Remember:** `f(a, b)` becomes `f(a)(b)`.

## What is partial application?
**Answer:** Partial application creates a new function by pre-filling some arguments of an existing function.
**Remember:** Fix some arguments now, supply the rest later.

## What is memoization?
**Answer:** Memoization caches a function result for previously seen inputs so expensive work can be reused.
**Remember:** Trade memory for less repeated computation.

## What is function composition?
**Answer:** Function composition combines small functions so the output of one becomes the input of another.
**Remember:** Build a pipeline of transformations.

## What is recursion?
**Answer:** Recursion is when a function calls itself, directly or indirectly, until a base condition stops the calls.
**Remember:** Recursive step + base case.

## How is `this` determined in JavaScript?
**Answer:** For regular functions, `this` is mainly determined by how the function is called. Arrow functions do not create their own `this`; they capture it lexically.
**Remember:** Regular function: call site. Arrow: surrounding scope.

## Why do arrow functions not have their own `this`?
**Answer:** Arrow functions intentionally capture `this` from the surrounding lexical scope, which makes them useful for callbacks that should keep outer context.
**Remember:** Arrow `this` comes from outside.

## What do `call`, `apply`, and `bind` do?
**Answer:** `call` invokes a function with an explicit `this` and separate arguments. `apply` does the same with an array-like argument list. `bind` returns a new function with `this` and optional arguments pre-bound.
**Remember:** `call` now, `apply` now with array, `bind` later.

## What is a prototype?
**Answer:** A prototype is an object another object can delegate property lookups to. It is the foundation of JavaScript’s prototype-based inheritance.
**Remember:** Missing property? Look at the prototype.

## What is the prototype chain?
**Answer:** If a property is not found directly on an object, JavaScript follows its prototype, then that prototype’s prototype, until it finds the property or reaches `null`.
**Remember:** Object → prototype → prototype → null.

## How do JavaScript classes relate to prototypes?
**Answer:** JavaScript `class` syntax is primarily a cleaner syntax over prototype-based inheritance. Instance methods are usually placed on the class prototype.
**Remember:** Class syntax, prototype mechanics.

## What is `Object.create()` useful for?
**Answer:** `Object.create(proto)` creates a new object whose prototype is the object you provide. It gives direct control over prototype inheritance.
**Remember:** Create an object with an explicit prototype.

## What is the difference between `Object.freeze()` and `Object.seal()`?
**Answer:** `freeze` prevents adding, deleting, or changing own properties. `seal` prevents adding or deleting properties but existing writable properties can still change.
**Remember:** Freeze is stricter than seal; both are shallow.

## What is `Map` vs a plain object?
**Answer:** `Map` is designed for key-value storage, supports keys of any type, preserves insertion order, and has convenient size/iteration APIs. Objects are primarily general-purpose records with string or symbol property keys.
**Remember:** Use `Map` when it is truly a map.

## What is `WeakMap`?
**Answer:** `WeakMap` stores object keys without preventing those objects from being garbage-collected. Its entries are intentionally not enumerable.
**Remember:** Metadata tied to object lifetime.

## What is `Set`?
**Answer:** `Set` stores unique values and is useful for membership checks and removing duplicates.
**Remember:** A collection with no duplicate values.

## Which common array methods mutate the array?
**Answer:** Examples include `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `copyWithin`, and `fill`.
**Remember:** Know mutation when working with React state.

## What is `map()` vs `forEach()`?
**Answer:** `map` returns a new array containing transformed results. `forEach` runs a function for side effects and returns `undefined`.
**Remember:** Transform with `map`; perform effects with `forEach`.

## What is `filter()` vs `find()`?
**Answer:** `filter` returns all matching elements in a new array. `find` returns the first matching element or `undefined`.
**Remember:** Many matches vs first match.

## What is `some()` vs `every()`?
**Answer:** `some` is true when at least one element passes the test. `every` is true only when all elements pass.
**Remember:** Any vs all.

## What is `reduce()`?
**Answer:** `reduce` walks an array while carrying an accumulator, producing one final value such as an object, number, grouping, or another array.
**Remember:** Many values → one accumulated result.
