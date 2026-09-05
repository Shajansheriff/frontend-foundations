---
title: "Functions & Objects"
order: 2
---
## Function declaration vs function expression?
**Answer:** A function declaration is declared with `function name()` and is available before its line in the scope. A function expression stores a function value in a variable and follows that variable’s initialization rules.
**Connect:** The practical differences are when the function binding becomes usable and how the function is represented in the surrounding code. Function declarations are initialized during scope creation; expressions are created when execution reaches the assignment.
**Example:** `greet()` can usually be called before `function greet(){}`. Calling a `const greet = () => {}` before its declaration hits the TDZ.
**Interview:** A function declaration is declared with `function name()` and is available before its line in the scope. A function expression stores a function value in a variable and follows that variable’s initialization rules. The practical differences are when the function binding becomes usable and how the function is represented in the surrounding code.
**Remember:** Declarations hoist differently from expressions.

## What are first-class functions?
**Answer:** Functions are values in JavaScript. They can be stored in variables, passed as arguments, returned from functions, and placed in objects.
**Connect:** Because functions are values, JavaScript APIs can accept behavior as data. Higher-order functions, callbacks, event handlers, hooks, and middleware all build on this one language property.
**Example:** You can store a function in an array, pass it to `map`, or return it from another function.
**Interview:** Functions are values in JavaScript. They can be stored in variables, passed as arguments, returned from functions, and placed in objects. Because functions are values, JavaScript APIs can accept behavior as data. The key idea is: Functions can travel like data.
**Remember:** Functions can travel like data.

## What is a higher-order function?
**Answer:** A higher-order function takes a function as an argument, returns a function, or both.
**Connect:** A higher-order function abstracts not only data but behavior. It can receive a function, return a function, or both, which lets you build reusable pipelines and wrappers.
**Example:** `array.map(transform)` is higher-order because `map` receives the `transform` function.
**Interview:** A higher-order function takes a function as an argument, returns a function, or both. A higher-order function abstracts not only data but behavior. The key idea is: `map`, `filter`, and function factories are common examples.
**Remember:** `map`, `filter`, and function factories are common examples.

## What is a callback?
**Answer:** A callback is a function passed to other code to be called later or when an operation reaches a certain point.
**Connect:** The important point is *who decides when to call it*. You provide the function now, and another function or system invokes it later or during its own operation. A callback is not automatically asynchronous.
**Example:** The function passed to `map` is a synchronous callback; a click handler is an asynchronous/event-driven callback.
**Interview:** A callback is a function passed to other code to be called later or when an operation reaches a certain point. The important point is *who decides when to call it*. The key idea is: Pass behavior into another function.
**Remember:** Pass behavior into another function.

## What is a pure function?
**Answer:** A pure function returns the same output for the same inputs and does not create observable side effects.
**Connect:** A pure function is predictable because the same inputs produce the same output and it does not mutate outside state. This makes functions easier to test, memoize, and compose, although real applications still need effects at system boundaries.
**Example:** `(a, b) => a + b` is pure. A function that writes to `localStorage` is not purely computational.
**Interview:** A pure function returns the same output for the same inputs and does not create observable side effects. A pure function is predictable because the same inputs produce the same output and it does not mutate outside state. The key idea is: Same input → same output, no outside changes.
**Remember:** Same input → same output, no outside changes.

## What is currying?
**Answer:** Currying transforms a function that takes multiple arguments into a chain of functions that each take one argument.
**Connect:** Currying changes a multi-argument function into a chain of one-argument functions. It is mainly useful when you want to configure part of a computation now and supply the remaining inputs later.
**Example:** `add(2)(3)` is the curried form of something like `add(2, 3)`.
**Interview:** Currying transforms a function that takes multiple arguments into a chain of functions that each take one argument. Currying changes a multi-argument function into a chain of one-argument functions. The key idea is: `f(a, b)` becomes `f(a)(b)`.
**Remember:** `f(a, b)` becomes `f(a)(b)`.

## What is partial application?
**Answer:** Partial application creates a new function by pre-filling some arguments of an existing function.
**Connect:** Partial application fixes some arguments and returns a function waiting for the rest. Unlike currying, it does not require converting every argument into a one-at-a-time chain.
**Example:** From `multiply(a, b)`, you can create `double = b => multiply(2, b)`.
**Interview:** Partial application creates a new function by pre-filling some arguments of an existing function. Partial application fixes some arguments and returns a function waiting for the rest. The key idea is: Fix some arguments now, supply the rest later.
**Remember:** Fix some arguments now, supply the rest later.

## What is memoization?
**Answer:** Memoization caches a function result for previously seen inputs so expensive work can be reused.
**Connect:** Memoization trades memory for computation. It only helps when repeated calls with the same effective inputs are common and the saved computation is more expensive than maintaining/checking the cache.
**Example:** Cache `formatExpensiveReport(data)` by an input key so repeated identical data can reuse the previous result.
**Interview:** Memoization caches a function result for previously seen inputs so expensive work can be reused. Memoization trades memory for computation. The key idea is: Trade memory for less repeated computation.
**Remember:** Trade memory for less repeated computation.

## What is function composition?
**Answer:** Function composition combines small functions so the output of one becomes the input of another.
**Connect:** Composition lets small transformations become a pipeline, where one function's output becomes the next function's input. It is easiest to reason about when the functions are pure and have clear input/output contracts.
**Example:** `trim → lowercase → slugify` can be composed into one reusable text-normalization function.
**Interview:** Function composition combines small functions so the output of one becomes the input of another. Composition lets small transformations become a pipeline, where one function's output becomes the next function's input. The key idea is: Build a pipeline of transformations.
**Remember:** Build a pipeline of transformations.

## What is recursion?
**Answer:** Recursion is when a function calls itself, directly or indirectly, until a base condition stops the calls.
**Connect:** Recursion needs a base case that eventually stops creating new calls. Each recursive call consumes another stack frame unless an implementation optimizes it, so iterative approaches are sometimes safer for very deep input.
**Example:** Walking a nested tree is naturally recursive: process the node, then recursively process its children.
**Interview:** Recursion is when a function calls itself, directly or indirectly, until a base condition stops the calls. Recursion needs a base case that eventually stops creating new calls. The key idea is: Recursive step + base case.
**Remember:** Recursive step + base case.

## How is `this` determined in JavaScript?
**Answer:** For regular functions, `this` is mainly determined by how the function is called. Arrow functions do not create their own `this`; they capture it lexically.
**Connect:** For regular functions, `this` is mainly determined by the call site, not where the function was defined. Method call, plain function call, constructor call, and explicit `call/apply/bind` can all produce different values.
**Example:** `obj.run()` gives `run` the receiver `obj`; storing `const run = obj.run; run()` loses that method receiver.
**Interview:** For regular functions, `this` is mainly determined by how the function is called. Arrow functions do not create their own `this`; they capture it lexically. For regular functions, `this` is mainly determined by the call site, not where the function was defined.
**Remember:** Regular function: call site. Arrow: surrounding scope.

## Why do arrow functions not have their own `this`?
**Answer:** Arrow functions intentionally capture `this` from the surrounding lexical scope, which makes them useful for callbacks that should keep outer context.
**Connect:** An arrow function does not create a new `this`; it closes over `this` from the surrounding lexical scope. That makes arrows convenient for callbacks but unsuitable when you need a method's `this` to be dynamically determined by its receiver.
**Example:** Inside a class method, an arrow callback can use `this.id` without rebinding `this` for the callback.
**Interview:** Arrow functions intentionally capture `this` from the surrounding lexical scope, which makes them useful for callbacks that should keep outer context. An arrow function does not create a new `this`; it closes over `this` from the surrounding lexical scope. The key idea is: Arrow `this` comes from outside.
**Remember:** Arrow `this` comes from outside.

## What do `call`, `apply`, and `bind` do?
**Answer:** `call` invokes a function with an explicit `this` and separate arguments. `apply` does the same with an array-like argument list. `bind` returns a new function with `this` and optional arguments pre-bound.
**Connect:** All three let you choose the `this` value for a regular function. `call` invokes now with separate arguments, `apply` invokes now with an argument array-like value, and `bind` returns a new function to invoke later.
**Example:** `fn.call(user, 1, 2)`, `fn.apply(user, [1,2])`, and `const bound = fn.bind(user)` differ mainly in argument shape and timing.
**Interview:** `call` invokes a function with an explicit `this` and separate arguments. `apply` does the same with an array-like argument list. `bind` returns a new function with `this` and optional arguments pre-bound. All three let you choose the `this` value for a regular function.
**Remember:** `call` now, `apply` now with array, `bind` later.

## What is a prototype?
**Answer:** A prototype is an object another object can delegate property lookups to. It is the foundation of JavaScript’s prototype-based inheritance.
**Connect:** A prototype is another object used as a fallback during property lookup. Constructor functions and classes make this relationship easier to create, but the underlying model is still object-to-object delegation.
**Example:** Instances created by a class typically share methods through the class's `.prototype` object instead of copying each method onto every instance.
**Interview:** A prototype is an object another object can delegate property lookups to. It is the foundation of JavaScript’s prototype-based inheritance. A prototype is another object used as a fallback during property lookup. The key idea is: Missing property? Look at the prototype.
**Remember:** Missing property? Look at the prototype.

## What is the prototype chain?
**Answer:** If a property is not found directly on an object, JavaScript follows its prototype, then that prototype’s prototype, until it finds the property or reaches `null`.
**Connect:** Objects can delegate missing property lookup to another object through their prototype. JavaScript keeps following that link until it finds the property or reaches `null`; this is the mechanism behind inherited methods.
**Example:** An array does not store its own `map` method on every instance; lookup reaches `Array.prototype.map`.
**Interview:** If a property is not found directly on an object, JavaScript follows its prototype, then that prototype’s prototype, until it finds the property or reaches `null`. Objects can delegate missing property lookup to another object through their prototype. The key idea is: Object → prototype → prototype → null.
**Remember:** Object → prototype → prototype → null.

## How do JavaScript classes relate to prototypes?
**Answer:** JavaScript `class` syntax is primarily a cleaner syntax over prototype-based inheritance. Instance methods are usually placed on the class prototype.
**Connect:** Class syntax gives JavaScript a familiar way to declare constructors, instance methods, inheritance, and private fields. For ordinary methods and inheritance, it still uses the prototype chain underneath rather than introducing a separate classical object model.
**Example:** A method declared in `class User { greet() {} }` is normally found through `User.prototype`, not copied into each `User` instance.
**Interview:** JavaScript `class` syntax is primarily a cleaner syntax over prototype-based inheritance. Instance methods are usually placed on the class prototype. Class syntax gives JavaScript a familiar way to declare constructors, instance methods, inheritance, and private fields.
**Remember:** Class syntax, prototype mechanics.

## What is `Object.create()` useful for?
**Answer:** `Object.create(proto)` creates a new object whose prototype is the object you provide. It gives direct control over prototype inheritance.
**Connect:** `Object.create(proto)` creates an object whose prototype is exactly the object you provide. It is useful when you want explicit prototype delegation without invoking a constructor.
**Example:** `const admin = Object.create(userMethods)` means missing methods on `admin` can be found on `userMethods`.
**Interview:** `Object.create(proto)` creates a new object whose prototype is the object you provide. It gives direct control over prototype inheritance. `Object.create(proto)` creates an object whose prototype is exactly the object you provide. The key idea is: Create an object with an explicit prototype.
**Remember:** Create an object with an explicit prototype.

## What is the difference between `Object.freeze()` and `Object.seal()`?
**Answer:** `freeze` prevents adding, deleting, or changing own properties. `seal` prevents adding or deleting properties but existing writable properties can still change.
**Connect:** Both are shallow restrictions. `seal` prevents adding/removing properties but lets existing writable properties change; `freeze` also makes existing data properties non-writable. Nested objects remain independently mutable unless frozen too.
**Example:** Freezing `{settings: {dark: false}}` prevents replacing `settings` but does not automatically freeze `settings.dark`.
**Interview:** `freeze` prevents adding, deleting, or changing own properties. `seal` prevents adding or deleting properties but existing writable properties can still change. Both are shallow restrictions. The key idea is: Freeze is stricter than seal; both are shallow.
**Remember:** Freeze is stricter than seal; both are shallow.

## What is `Map` vs a plain object?
**Answer:** `Map` is designed for key-value storage, supports keys of any type, preserves insertion order, and has convenient size/iteration APIs. Objects are primarily general-purpose records with string or symbol property keys.
**Connect:** A `Map` is designed specifically as a key-value collection: keys can be any value, insertion order is well-defined, and it has collection APIs such as `.size`. Plain objects are great for records with known string/symbol property names.
**Example:** Use an object for `{name, email}`. Use a `Map<Element, Metadata>` when DOM elements themselves need to be keys.
**Interview:** `Map` is designed for key-value storage, supports keys of any type, preserves insertion order, and has convenient size/iteration APIs. Objects are primarily general-purpose records with string or symbol property keys. A `Map` is designed specifically as a key-value collection: keys can be any value, insertion order is well-defined, and it has collection APIs such as `.size`.
**Remember:** Use `Map` when it is truly a map.

## What is `WeakMap`?
**Answer:** `WeakMap` stores object keys without preventing those objects from being garbage-collected. Its entries are intentionally not enumerable.
**Connect:** WeakMap keys must be objects and are held weakly, meaning the WeakMap does not keep the key object alive by itself. That makes it useful for associating metadata with objects without creating a memory-retention path.
**Example:** A library can store private metadata for DOM nodes in a `WeakMap`; when a node becomes otherwise unreachable, its metadata can be collected too.
**Interview:** `WeakMap` stores object keys without preventing those objects from being garbage-collected. Its entries are intentionally not enumerable. WeakMap keys must be objects and are held weakly, meaning the WeakMap does not keep the key object alive by itself. The key idea is: Metadata tied to object lifetime.
**Remember:** Metadata tied to object lifetime.

## What is `Set`?
**Answer:** `Set` stores unique values and is useful for membership checks and removing duplicates.
**Connect:** A Set stores unique values using value identity/equality rules. It is useful for membership tests and deduplication when you do not need a value mapped to each key.
**Example:** `[...new Set(['a','a','b'])]` becomes `['a','b']`.
**Interview:** `Set` stores unique values and is useful for membership checks and removing duplicates. A Set stores unique values using value identity/equality rules. The key idea is: A collection with no duplicate values.
**Remember:** A collection with no duplicate values.

## Which common array methods mutate the array?
**Answer:** Examples include `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `copyWithin`, and `fill`.
**Connect:** Mutation means the existing array object changes, which matters when other code holds the same reference. Methods such as `push`, `pop`, `splice`, `sort`, and `reverse` mutate; methods such as `map`, `filter`, and `slice` return new arrays.
**Example:** In React state, prefer `toSorted()` or `[...items].sort()` over mutating the state array with `items.sort()`.
**Interview:** Examples include `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `copyWithin`, and `fill`. Mutation means the existing array object changes, which matters when other code holds the same reference. The key idea is: Know mutation when working with React state.
**Remember:** Know mutation when working with React state.

## What is `map()` vs `forEach()`?
**Answer:** `map` returns a new array containing transformed results. `forEach` runs a function for side effects and returns `undefined`.
**Connect:** Choose based on intent. `map` is a transformation: one input element becomes one output element and a new array is returned. `forEach` is for performing an effect for each item and discards callback return values.
**Example:** Use `users.map(u => u.name)` to create names. Use `users.forEach(logUser)` if the purpose is just logging.
**Interview:** `map` returns a new array containing transformed results. `forEach` runs a function for side effects and returns `undefined`. Choose based on intent. The key idea is: Transform with `map`; perform effects with `forEach`.
**Remember:** Transform with `map`; perform effects with `forEach`.

## What is `filter()` vs `find()`?
**Answer:** `filter` returns all matching elements in a new array. `find` returns the first matching element or `undefined`.
**Connect:** `filter` answers 'which items match?' and can return many; `find` answers 'what is the first matching item?' and stops once it finds one. Choosing `find` can avoid unnecessary work when only one result is needed.
**Example:** Find a user by ID with `find`; get all active users with `filter`.
**Interview:** `filter` returns all matching elements in a new array. `find` returns the first matching element or `undefined`. `filter` answers 'which items match?' and can return many; `find` answers 'what is the first matching item?' and stops once it finds one. The key idea is: Many matches vs first match.
**Remember:** Many matches vs first match.

## What is `some()` vs `every()`?
**Answer:** `some` is true when at least one element passes the test. `every` is true only when all elements pass.
**Connect:** Both return booleans and can short-circuit. `some` succeeds as soon as one element passes; `every` fails as soon as one element fails.
**Example:** Use `some` to check whether any field has an error; `every` to check whether all required steps are complete.
**Interview:** `some` is true when at least one element passes the test. `every` is true only when all elements pass. Both return booleans and can short-circuit. The key idea is: Any vs all.
**Remember:** Any vs all.

## What is `reduce()`?
**Answer:** `reduce` walks an array while carrying an accumulator, producing one final value such as an object, number, grouping, or another array.
**Connect:** `reduce` carries an accumulator from one element to the next, so it can express totals, grouping, indexing, or transformations. It is powerful, but a clear `map`, `filter`, or loop is often preferable when those directly describe the intent.
**Example:** Group orders by status by accumulating into an object or Map keyed by status.
**Interview:** `reduce` walks an array while carrying an accumulator, producing one final value such as an object, number, grouping, or another array. `reduce` carries an accumulator from one element to the next, so it can express totals, grouping, indexing, or transformations.
**Remember:** Many values → one accumulated result.
