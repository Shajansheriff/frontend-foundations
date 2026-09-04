---
title: "JavaScript Core"
order: 1
---

## What is the JavaScript call stack?
**Answer:** The call stack is where JavaScript tracks which functions are currently running. A function call is pushed onto the stack and removed when it returns.
**Remember:** One thread, one stack, last-in first-out.

## What is a stack frame?
**Answer:** A stack frame is the call-stack entry for one function invocation. It holds that call’s local variables, arguments, and return position.
**Remember:** One function call = one frame.

## What does single-threaded mean in JavaScript?
**Answer:** JavaScript executes one piece of JavaScript code at a time on its main thread. Concurrency comes from the host environment and the event loop.
**Remember:** One JS execution thread does not mean the browser only does one thing.

## What is an execution context?
**Answer:** An execution context is the environment created to run JavaScript code. It contains bindings such as variables, functions, scope information, and `this`.
**Remember:** The runtime box around executing code.

## What is scope?
**Answer:** Scope decides where a variable can be accessed. JavaScript has global, function, module, and block scope.
**Remember:** Scope answers: where can I use this name?

## What is lexical scope?
**Answer:** Lexical scope means scope is determined by where code is written, not where a function is called.
**Remember:** Look at the source code nesting.

## What is the scope chain?
**Answer:** When JavaScript cannot find a variable in the current scope, it looks outward through enclosing lexical scopes until it finds it or reaches global scope.
**Remember:** Current scope → parent → parent → global.

## What is a closure?
**Answer:** A closure is a function that keeps access to variables from the lexical scope where it was created, even after the outer function has finished.
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
**Remember:** Preserve state without making it global.

## What is hoisting?
**Answer:** Hoisting describes how declarations are processed before code executes. Function declarations are available early; `var` exists as `undefined`; `let` and `const` exist but cannot be accessed before initialization.
**Remember:** Declarations are prepared before execution, but not all behave the same.

## What is the Temporal Dead Zone?
**Answer:** The TDZ is the period from entering a block until a `let` or `const` variable is initialized. Accessing it during that period throws a `ReferenceError`.
**Remember:** `let`/`const` are hoisted but unusable before initialization.

## What is the difference between `var`, `let`, and `const`?
**Answer:** `var` is function-scoped and can be redeclared. `let` and `const` are block-scoped; `const` cannot be reassigned after initialization.
**Remember:** Prefer `const`, use `let` when reassignment is required, avoid `var` in modern code.

## Does `const` make an object immutable?
**Answer:** No. `const` prevents reassignment of the variable binding. The object itself can still be mutated unless you prevent that separately.
**Remember:** `const` locks the reference, not the object.

## What are primitive values?
**Answer:** Primitives are immutable values such as string, number, boolean, bigint, symbol, `null`, and `undefined`.
**Remember:** Primitives are values, not mutable objects.

## Primitive vs object assignment: what is copied?
**Answer:** Assigning a primitive copies its value. Assigning an object copies the reference value, so both variables can point to the same object.
**Remember:** Objects are shared through copied references.

## Are objects passed by reference in JavaScript?
**Answer:** Strictly, JavaScript passes everything by value. For objects, that value is a reference to the object.
**Remember:** Pass-by-value of a reference.

## What is the difference between `null` and `undefined`?
**Answer:** `undefined` usually means a value is missing or not assigned. `null` is an explicit value commonly used to mean intentionally empty.
**Remember:** `undefined` = absent by default; `null` = intentionally empty.

## Why does `typeof null` return `"object"`?
**Answer:** It is a historical JavaScript bug kept for backward compatibility. `null` is still a primitive, not an object.
**Remember:** Old language quirk, not meaningful type information.

## What is the difference between `==` and `===`?
**Answer:** `===` compares without type coercion. `==` can convert operands before comparing, which creates surprising cases.
**Remember:** Use strict equality by default.

## What are truthy and falsy values?
**Answer:** Falsy values are `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`. Other values are truthy.
**Remember:** Empty arrays and empty objects are truthy.

## What is the difference between `||` and `??`?
**Answer:** `||` falls back for any falsy left value. `??` falls back only for `null` or `undefined`.
**Remember:** Use `??` when `0`, `false`, or empty string are valid values.

## What is optional chaining?
**Answer:** Optional chaining `?.` stops a property access or call when the value before it is `null` or `undefined`, returning `undefined` instead of throwing.
**Remember:** Safely walk possibly missing values.

## What is short-circuit evaluation?
**Answer:** Logical operators may stop evaluating once the result is already known. For example, `a && b` does not evaluate `b` when `a` is falsy.
**Remember:** The right side may never run.

## What is a shallow copy?
**Answer:** A shallow copy creates a new top-level object or array but keeps references to nested objects.
**Remember:** New container, shared nested objects.

## What is a deep copy?
**Answer:** A deep copy recursively creates independent copies of nested data, so changes to nested objects do not affect the original.
**Remember:** No shared nested references.

## What is destructuring?
**Answer:** Destructuring extracts values from arrays or properties from objects into variables using concise syntax.
**Remember:** Unpack values by position or property name.

## Rest vs spread: what is the difference?
**Answer:** Spread expands an iterable or object into individual values or properties. Rest collects remaining values into one array or object.
**Remember:** Spread expands; rest collects.

## What is an IIFE?
**Answer:** An IIFE is a function expression invoked immediately after it is created. It was often used to create private scope before modules and block-scoped variables became common.
**Remember:** Define and run immediately.
