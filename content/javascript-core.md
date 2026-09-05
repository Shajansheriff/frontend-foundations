---
title: "JavaScript Core"
order: 1
---
## What is the JavaScript call stack?
**Answer:** The call stack is where JavaScript tracks which functions are currently running. A function call is pushed onto the stack and removed when it returns.
**Connect:** Think of the stack as a pile of active function calls. The currently executing function is on top; when it returns, its frame is popped and execution continues in the caller below it. Long synchronous work keeps that stack busy, which is why the UI can freeze.
**Example:** If `A()` calls `B()` and `B()` calls `C()`, the stack is `A → B → C`. `C` finishes first, then `B`, then `A`.
**Interview:** The call stack is where JavaScript tracks which functions are currently running. A function call is pushed onto the stack and removed when it returns. Think of the stack as a pile of active function calls. The key idea is: One thread, one stack, last-in first-out.
**Remember:** One thread, one stack, last-in first-out.

## What is a stack frame?
**Answer:** A stack frame is the call-stack entry for one function invocation. It holds that call’s local variables, arguments, and return position.
**Connect:** A stack frame is the runtime information for one particular call, not for the function definition itself. Calling the same function recursively creates a new frame every time, which is why deep recursion can overflow the stack.
**Example:** Calling `sum(3)` recursively may create frames for `sum(3)`, `sum(2)`, `sum(1)`, and so on.
**Interview:** A stack frame is the call-stack entry for one function invocation. It holds that call’s local variables, arguments, and return position. A stack frame is the runtime information for one particular call, not for the function definition itself. The key idea is: One function call = one frame.
**Remember:** One function call = one frame.

## What does single-threaded mean in JavaScript?
**Answer:** JavaScript executes one piece of JavaScript code at a time on its main thread. Concurrency comes from the host environment and the event loop.
**Connect:** Single-threaded describes JavaScript execution on the main thread, not the whole browser. Networking, timers, rendering machinery, and workers can make progress elsewhere; the event loop decides when their callbacks get a turn on the JS thread.
**Example:** A `fetch()` can wait for the network without blocking JavaScript. Your callback runs later when the Promise settles and the stack can accept more work.
**Interview:** JavaScript executes one piece of JavaScript code at a time on its main thread. Concurrency comes from the host environment and the event loop. Single-threaded describes JavaScript execution on the main thread, not the whole browser. The key idea is: One JS execution thread does not mean the browser only does one thing.
**Remember:** One JS execution thread does not mean the browser only does one thing.

## What is an execution context?
**Answer:** An execution context is the environment created to run JavaScript code. It contains bindings such as variables, functions, scope information, and `this`.
**Connect:** When code starts executing, JavaScript needs a place to resolve names and `this`. A new function call gets a new function execution context, while the global/module code has its own context. Closures work because functions keep links to the lexical environments associated with these contexts.
**Example:** Two calls to the same function can have different local variables because each call has its own execution context.
**Interview:** An execution context is the environment created to run JavaScript code. It contains bindings such as variables, functions, scope information, and `this`. When code starts executing, JavaScript needs a place to resolve names and `this`. The key idea is: The runtime box around executing code.
**Remember:** The runtime box around executing code.

## What is scope?
**Answer:** Scope decides where a variable can be accessed. JavaScript has global, function, module, and block scope.
**Connect:** Scope is the visibility boundary for identifiers. Block scope means braces such as an `if` or `for` can create a boundary for `let`/`const`; function scope means `var` ignores those block boundaries but stays inside the function.
**Example:** A `const x` declared inside an `if` block cannot be read outside that block.
**Interview:** Scope decides where a variable can be accessed. JavaScript has global, function, module, and block scope. Scope is the visibility boundary for identifiers. The key idea is: Scope answers: where can I use this name?.
**Remember:** Scope answers: where can I use this name?

## What is lexical scope?
**Answer:** Lexical scope means scope is determined by where code is written, not where a function is called.
**Connect:** The word *lexical* means 'based on where the code is written'. A function searches variables in the scopes surrounding its definition, even if you call that function from somewhere completely different.
**Example:** If `inner` is written inside `outer`, `inner` can access `outer`'s variables. Calling `inner` from another function does not change that relationship.
**Interview:** Lexical scope means scope is determined by where code is written, not where a function is called. The word *lexical* means 'based on where the code is written'. The key idea is: Look at the source code nesting.
**Remember:** Look at the source code nesting.

## What is the scope chain?
**Answer:** When JavaScript cannot find a variable in the current scope, it looks outward through enclosing lexical scopes until it finds it or reaches global scope.
**Connect:** Variable lookup starts locally and walks outward through lexical parents. It never walks into sibling or child scopes. This lookup path is what a closure later preserves access to.
**Example:** If `name` is not inside `inner()`, JavaScript checks `outer()`'s scope, then the module/global scope.
**Interview:** When JavaScript cannot find a variable in the current scope, it looks outward through enclosing lexical scopes until it finds it or reaches global scope. Variable lookup starts locally and walks outward through lexical parents. The key idea is: Current scope → parent → parent → global.
**Remember:** Current scope → parent → parent → global.

## What is a closure?
**Answer:** A closure is a function that keeps access to variables from the lexical scope where it was created, even after the outer function has finished.
**Connect:** A closure is created because a function carries a reference to the lexical environment where that function was defined. If the function escapes that scope, the variables it still needs cannot be discarded yet. This is why a returned callback can keep private state alive after the outer call has returned.
**Example:** A `makeCounter()` function can return `() => ++count`. Each returned function remembers its own `count`, so two counters can maintain independent state.
**Interview:** A closure is a function that keeps access to variables from the lexical scope where it was created, even after the outer function has finished. A closure is created because a function carries a reference to the lexical environment where that function was defined.
**Remember:** Closure = function + remembered lexical scope.
```js
function makeCounter() {
  let count = 0;
  return () => ++count;
}

const count = makeCounter();
count(); // 1
count(); // 2
```

## Why are closures useful?
**Answer:** Closures let functions preserve private state and context. They appear in callbacks, factories, memoization, event handlers, and React hooks.
**Connect:** Closures are the mechanism behind many patterns that look like 'a callback remembers something'. They let you keep data private without putting it on a global object, but they can also accidentally retain large objects in memory if a long-lived callback still references them.
**Example:** An event handler can remember the item ID that existed when the handler was created, even when it runs much later.
**Interview:** Closures let functions preserve private state and context. They appear in callbacks, factories, memoization, event handlers, and React hooks. Closures are the mechanism behind many patterns that look like 'a callback remembers something'. The key idea is: Preserve state without making it global.
**Remember:** Preserve state without making it global.

## What is hoisting?
**Answer:** Hoisting describes how declarations are processed before code executes. Function declarations are available early; `var` exists as `undefined`; `let` and `const` exist but cannot be accessed before initialization.
**Connect:** A useful mental model is that JavaScript creates bindings before executing the statements in a scope. The important part is not 'code moves upward'; it does not. Different declarations are initialized differently, which explains why function declarations, `var`, and `let`/`const` behave differently before their source line.
**Example:** Calling a function declaration before its line can work, but reading a `let` variable before its declaration throws because it is still in the TDZ.
**Interview:** Hoisting describes how declarations are processed before code executes. Function declarations are available early; `var` exists as `undefined`; `let` and `const` exist but cannot be accessed before initialization. A useful mental model is that JavaScript creates bindings before executing the statements in a scope.
**Remember:** Declarations are prepared before execution, but not all behave the same.

## What is the Temporal Dead Zone?
**Answer:** The TDZ is the period from entering a block until a `let` or `const` variable is initialized. Accessing it during that period throws a `ReferenceError`.
**Connect:** The binding already exists during the TDZ, which is why an outer variable with the same name is also hidden. JavaScript deliberately prevents access until initialization so you do not accidentally use a block-scoped variable before its declaration.
**Example:** Inside a block, `console.log(x); let x = 1;` throws instead of falling back to an outer `x`.
**Interview:** The TDZ is the period from entering a block until a `let` or `const` variable is initialized. Accessing it during that period throws a `ReferenceError`. The binding already exists during the TDZ, which is why an outer variable with the same name is also hidden.
**Remember:** `let`/`const` are hoisted but unusable before initialization.

## What is the difference between `var`, `let`, and `const`?
**Answer:** `var` is function-scoped and can be redeclared. `let` and `const` are block-scoped; `const` cannot be reassigned after initialization.
**Connect:** The biggest difference is scope and lifecycle, not merely whether reassignment is allowed. `var` is function-scoped and initialized to `undefined`; `let` and `const` are block-scoped and protected by the TDZ. `const` only prevents rebinding, so properties of a referenced object can still change.
**Example:** Use `const user = {name: 'A'}` and `user.name = 'B'` is valid; `user = {}` is not.
**Interview:** `var` is function-scoped and can be redeclared. `let` and `const` are block-scoped; `const` cannot be reassigned after initialization. The biggest difference is scope and lifecycle, not merely whether reassignment is allowed. The key idea is: Prefer `const`, use `let` when reassignment is required, avoid `var` in modern code.
**Remember:** Prefer `const`, use `let` when reassignment is required, avoid `var` in modern code.

## Does `const` make an object immutable?
**Answer:** No. `const` prevents reassignment of the variable binding. The object itself can still be mutated unless you prevent that separately.
**Connect:** A variable stores a value. For an object, that value is a reference. `const` prevents replacing the reference stored in the variable, but it says nothing about whether the object at that reference can be mutated.
**Example:** `const items = []; items.push(1)` is allowed. Reassigning `items = []` is not.
**Interview:** No. `const` prevents reassignment of the variable binding. The object itself can still be mutated unless you prevent that separately. A variable stores a value. The key idea is: `const` locks the reference, not the object.
**Remember:** `const` locks the reference, not the object.

## What are primitive values?
**Answer:** Primitives are immutable values such as string, number, boolean, bigint, symbol, `null`, and `undefined`.
**Connect:** Primitives behave like standalone immutable values, while objects have identity. That identity is why two separately created objects with identical contents are still not strictly equal.
**Example:** `'a' === 'a'` is true, but `{x: 1} === {x: 1}` is false because those are two different objects.
**Interview:** Primitives are immutable values such as string, number, boolean, bigint, symbol, `null`, and `undefined`. Primitives behave like standalone immutable values, while objects have identity. The key idea is: Primitives are values, not mutable objects.
**Remember:** Primitives are values, not mutable objects.

## Primitive vs object assignment: what is copied?
**Answer:** Assigning a primitive copies its value. Assigning an object copies the reference value, so both variables can point to the same object.
**Connect:** For objects, the copied reference means mutations through either variable are visible through the other. Reassigning one variable later only changes that variable's reference, not the other one.
**Example:** `const b = a; b.name = 'B'` changes the shared object. `b = anotherObject` would only point `b` somewhere else if `b` were reassignable.
**Interview:** Assigning a primitive copies its value. Assigning an object copies the reference value, so both variables can point to the same object. For objects, the copied reference means mutations through either variable are visible through the other. The key idea is: Objects are shared through copied references.
**Remember:** Objects are shared through copied references.

## Are objects passed by reference in JavaScript?
**Answer:** Strictly, JavaScript passes everything by value. For objects, that value is a reference to the object.
**Connect:** The distinction matters when a function reassigns its parameter. It can mutate the object both variables point to, but assigning the parameter to a brand-new object does not change the caller's variable. That behavior is exactly pass-by-value where the copied value happens to be a reference.
**Example:** A function can do `obj.x = 2` and the caller sees it; doing `obj = {x: 3}` only changes the local parameter.
**Interview:** Strictly, JavaScript passes everything by value. For objects, that value is a reference to the object. The distinction matters when a function reassigns its parameter. The key idea is: Pass-by-value of a reference.
**Remember:** Pass-by-value of a reference.

## What is the difference between `null` and `undefined`?
**Answer:** `undefined` usually means a value is missing or not assigned. `null` is an explicit value commonly used to mean intentionally empty.
**Connect:** Both often mean 'no useful value', but they usually communicate different intent. APIs and libraries sometimes deliberately choose one, so the important skill is to be consistent at boundaries and use nullish checks when either is acceptable.
**Example:** An uninitialized variable is `undefined`; an API model might deliberately use `manager: null` to say 'this employee has no manager'.
**Interview:** `undefined` usually means a value is missing or not assigned. `null` is an explicit value commonly used to mean intentionally empty. Both often mean 'no useful value', but they usually communicate different intent. The key idea is: `undefined` = absent by default; `null` = intentionally empty.
**Remember:** `undefined` = absent by default; `null` = intentionally empty.

## Why does `typeof null` return `"object"`?
**Answer:** It is a historical JavaScript bug kept for backward compatibility. `null` is still a primitive, not an object.
**Connect:** This result comes from an old representation choice in early JavaScript and cannot be fixed without breaking existing code. Treat it as a historical compatibility quirk rather than evidence that `null` behaves like an object.
**Example:** Use `value === null` when you specifically need to detect null; do not use `typeof value === 'object'` alone.
**Interview:** It is a historical JavaScript bug kept for backward compatibility. `null` is still a primitive, not an object. This result comes from an old representation choice in early JavaScript and cannot be fixed without breaking existing code. The key idea is: Old language quirk, not meaningful type information.
**Remember:** Old language quirk, not meaningful type information.

## What is the difference between `==` and `===`?
**Answer:** `===` compares without type coercion. `==` can convert operands before comparing, which creates surprising cases.
**Connect:** Loose equality follows coercion rules before comparing, so you must know a conversion table to predict some cases. Strict equality skips that conversion step, making the comparison easier to reason about. There are a few intentional uses of `x == null`, but `===` is the normal default.
**Example:** `0 == false` is true after coercion, while `0 === false` is false because the types differ.
**Interview:** `===` compares without type coercion. `==` can convert operands before comparing, which creates surprising cases. Loose equality follows coercion rules before comparing, so you must know a conversion table to predict some cases. The key idea is: Use strict equality by default.
**Remember:** Use strict equality by default.

## What are truthy and falsy values?
**Answer:** Falsy values are `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`. Other values are truthy.
**Connect:** Truthiness appears whenever JavaScript expects a boolean, including `if`, `&&`, and `||`. The common interview trap is assuming 'empty' objects or arrays are falsy; object identity makes them truthy regardless of contents.
**Example:** `if ([])` enters the branch. `if ('')` does not.
**Interview:** Falsy values are `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`. Other values are truthy. Truthiness appears whenever JavaScript expects a boolean, including `if`, `&&`, and `||`. The key idea is: Empty arrays and empty objects are truthy.
**Remember:** Empty arrays and empty objects are truthy.

## What is the difference between `||` and `??`?
**Answer:** `||` falls back for any falsy left value. `??` falls back only for `null` or `undefined`.
**Connect:** This distinction matters for valid falsy data. `||` is a boolean-style fallback; `??` is a missing-value fallback. Using `||` for configuration can accidentally replace legitimate values such as zero or an empty string.
**Example:** `count || 10` turns `0` into `10`; `count ?? 10` keeps `0` and only falls back for `null`/`undefined`.
**Interview:** `||` falls back for any falsy left value. `??` falls back only for `null` or `undefined`. This distinction matters for valid falsy data. The key idea is: Use `??` when `0`, `false`, or empty string are valid values.
**Remember:** Use `??` when `0`, `false`, or empty string are valid values.

## What is optional chaining?
**Answer:** Optional chaining `?.` stops a property access or call when the value before it is `null` or `undefined`, returning `undefined` instead of throwing.
**Connect:** Optional chaining only guards the value immediately to its left. It is useful for genuinely optional paths, but using it everywhere can hide a data-contract bug that should have failed loudly.
**Example:** `user.profile?.avatarUrl` is safe if `profile` may be absent. It returns `undefined` instead of throwing.
**Interview:** Optional chaining `?.` stops a property access or call when the value before it is `null` or `undefined`, returning `undefined` instead of throwing. Optional chaining only guards the value immediately to its left. The key idea is: Safely walk possibly missing values.
**Remember:** Safely walk possibly missing values.

## What is short-circuit evaluation?
**Answer:** Logical operators may stop evaluating once the result is already known. For example, `a && b` does not evaluate `b` when `a` is falsy.
**Connect:** Logical operators return operands, not necessarily booleans, and may skip evaluating the right side. That makes them useful for defaults and conditional execution, but it also means any side effect on the skipped side never happens.
**Example:** `isReady && start()` calls `start` only when `isReady` is truthy.
**Interview:** Logical operators may stop evaluating once the result is already known. For example, `a && b` does not evaluate `b` when `a` is falsy. Logical operators return operands, not necessarily booleans, and may skip evaluating the right side. The key idea is: The right side may never run.
**Remember:** The right side may never run.

## What is a shallow copy?
**Answer:** A shallow copy creates a new top-level object or array but keeps references to nested objects.
**Connect:** Shallow copying is enough when you only change a top-level field, but it does not recursively detach nested structures. This is especially important in React because accidentally mutating a shared nested object can break predictable state updates.
**Example:** `const next = {...user}` creates a new `user`, but `next.address === user.address` is still true.
**Interview:** A shallow copy creates a new top-level object or array but keeps references to nested objects. Shallow copying is enough when you only change a top-level field, but it does not recursively detach nested structures. The key idea is: New container, shared nested objects.
**Remember:** New container, shared nested objects.

## What is a deep copy?
**Answer:** A deep copy recursively creates independent copies of nested data, so changes to nested objects do not affect the original.
**Connect:** Deep copying creates independence through the whole copied graph, but it can be expensive and is often unnecessary. In application state, prefer copying only the path you are changing rather than cloning an entire large object tree.
**Example:** If only `user.address.city` changes, create new objects for `user` and `address`; unrelated nested objects can remain shared.
**Interview:** A deep copy recursively creates independent copies of nested data, so changes to nested objects do not affect the original. Deep copying creates independence through the whole copied graph, but it can be expensive and is often unnecessary. The key idea is: No shared nested references.
**Remember:** No shared nested references.

## What is destructuring?
**Answer:** Destructuring extracts values from arrays or properties from objects into variables using concise syntax.
**Connect:** Destructuring is syntax over normal property/index access. It becomes especially useful for function parameters, default values, and selecting only the fields a component needs.
**Example:** `const {name, role = 'user'} = account` reads two properties and gives `role` a default when it is `undefined`.
**Interview:** Destructuring extracts values from arrays or properties from objects into variables using concise syntax. Destructuring is syntax over normal property/index access. The key idea is: Unpack values by position or property name.
**Remember:** Unpack values by position or property name.

## Rest vs spread: what is the difference?
**Answer:** Spread expands an iterable or object into individual values or properties. Rest collects remaining values into one array or object.
**Connect:** The same `...` syntax does opposite jobs depending on position. In a value being created, it spreads things out; in a binding or parameter list, it gathers the remainder together.
**Example:** `[...items, next]` spreads an array; `function f(first, ...rest)` collects the remaining arguments.
**Interview:** Spread expands an iterable or object into individual values or properties. Rest collects remaining values into one array or object. The same `...` syntax does opposite jobs depending on position. The key idea is: Spread expands; rest collects.
**Remember:** Spread expands; rest collects.

## What is an IIFE?
**Answer:** An IIFE is a function expression invoked immediately after it is created. It was often used to create private scope before modules and block-scoped variables became common.
**Connect:** IIFEs were heavily used to create a private function scope before `let`, `const`, and ES modules existed. You still see them in legacy code or when a one-off isolated execution scope is convenient.
**Example:** `(() => { const secret = 1; })()` runs immediately and `secret` is not available outside.
**Interview:** An IIFE is a function expression invoked immediately after it is created. It was often used to create private scope before modules and block-scoped variables became common. IIFEs were heavily used to create a private function scope before `let`, `const`, and ES modules existed.
**Remember:** Define and run immediately.
