---
title: "Async JavaScript"
order: 3
---
## What is the event loop?
**Answer:** The event loop coordinates the call stack and queued asynchronous callbacks. When the stack is empty, it lets queued work run according to task priority rules.
**Connect:** The event loop coordinates when queued work may enter JavaScript. Synchronous code runs until the call stack is empty; then the runtime drains microtasks before moving to the next task/macrotask, with rendering opportunities between task turns depending on the browser.
**Example:** If sync code logs A/D, a resolved Promise logs C, and a zero-delay timer logs B, the usual order is A, D, C, B.
**Interview:** The event loop coordinates the call stack and queued asynchronous callbacks. When the stack is empty, it lets queued work run according to task priority rules. The event loop coordinates when queued work may enter JavaScript. The key idea is: Stack runs now; queues wait; event loop coordinates.
**Remember:** Stack runs now; queues wait; event loop coordinates.

## What are browser Web APIs?
**Answer:** Web APIs are browser capabilities such as timers, fetch, DOM events, and storage. They are provided by the browser, not by the JavaScript language itself.
**Connect:** APIs such as timers, DOM events, and networking are provided by the browser, not by the ECMAScript language itself. They can wait or perform work outside the JS call stack and later arrange for JavaScript callbacks to run.
**Example:** `setTimeout` registers a timer with the browser; JavaScript does not sit on the stack counting milliseconds.
**Interview:** Web APIs are browser capabilities such as timers, fetch, DOM events, and storage. They are provided by the browser, not by the JavaScript language itself. APIs such as timers, DOM events, and networking are provided by the browser, not by the ECMAScript language itself.
**Remember:** JavaScript language + browser host APIs.

## What is a task or macrotask?
**Answer:** A task is a unit of queued work such as a timer callback, user event, or message event. The browser generally runs one task, then drains microtasks before moving on.
**Connect:** Tasks are the larger event-loop units such as timer callbacks, user events, or message events. After one task finishes, microtasks are drained before the browser proceeds to another task.
**Example:** A `setTimeout` callback is queued as a future task after its timer threshold is reached.
**Interview:** A task is a unit of queued work such as a timer callback, user event, or message event. The browser generally runs one task, then drains microtasks before moving on. Tasks are the larger event-loop units such as timer callbacks, user events, or message events.
**Remember:** Timer callbacks live in the task world.

## What is a microtask?
**Answer:** A microtask is high-priority queued work that runs after the current JavaScript stack finishes and before the next task. Promise reactions and `queueMicrotask` use this queue.
**Connect:** Microtasks are high-priority follow-up work that runs after the current JavaScript stack finishes and before the next task. Promise reactions and `queueMicrotask` use this queue, so a long chain of microtasks can delay timers and rendering.
**Example:** `Promise.resolve().then(fn)` schedules `fn` as a microtask rather than running it synchronously.
**Interview:** A microtask is high-priority queued work that runs after the current JavaScript stack finishes and before the next task. Promise reactions and `queueMicrotask` use this queue. Microtasks are high-priority follow-up work that runs after the current JavaScript stack finishes and before the next task.
**Remember:** Promises run before the next timer task.

## Why does a resolved Promise callback usually run before `setTimeout(..., 0)`?
**Answer:** Promise callbacks are microtasks. A zero-delay timer schedules a task, and microtasks are drained before the event loop takes the next task.
**Connect:** When the current stack finishes, the event loop drains the microtask queue before taking the next task from the task queue. A Promise reaction is a microtask, while a timer callback is a task, so the Promise normally gets the earlier turn.
**Example:** Sync logs happen first, then `.then(...)`, then `setTimeout(..., 0)` assuming no other queued work changes the picture.
**Interview:** Promise callbacks are microtasks. A zero-delay timer schedules a task, and microtasks are drained before the event loop takes the next task. When the current stack finishes, the event loop drains the microtask queue before taking the next task from the task queue.
**Remember:** Microtasks beat the next timer task.
```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
// A, D, C, B
```

## What is a Promise?
**Answer:** A Promise is an object representing the eventual success or failure of an asynchronous operation.
**Connect:** A Promise is a placeholder for one eventual completion value or failure reason. It lets asynchronous operations compose: handlers can return ordinary values or more Promises, and the next link in the chain adopts that result.
**Example:** `fetch('/api/user')` gives you a Promise now; code in `await`/`.then` runs after that operation settles.
**Interview:** A Promise is an object representing the eventual success or failure of an asynchronous operation. A Promise is a placeholder for one eventual completion value or failure reason. The key idea is: A container for a future result.
**Remember:** A container for a future result.

## What are the states of a Promise?
**Answer:** A Promise starts pending and becomes either fulfilled with a value or rejected with a reason. Once settled, it cannot change state again.
**Connect:** A Promise starts pending and can settle exactly once as fulfilled or rejected. Once settled, its state/result is fixed; attaching handlers later still schedules them to observe that settled result.
**Example:** A network request Promise may be pending for 200 ms, then fulfill with a `Response`; it cannot later switch to rejected.
**Interview:** A Promise starts pending and becomes either fulfilled with a value or rejected with a reason. Once settled, it cannot change state again. A Promise starts pending and can settle exactly once as fulfilled or rejected. The key idea is: Pending → fulfilled or rejected.
**Remember:** Pending → fulfilled or rejected.

## What does `.then()` return?
**Answer:** `.then()` returns a new Promise. The value you return becomes the next fulfillment value; throwing or returning a rejected Promise moves the chain to rejection.
**Connect:** Every `.then` call creates a new Promise. If the callback returns a plain value, the new Promise fulfills with that value; if it throws, the new Promise rejects; if it returns another Promise, the chain waits for and adopts that Promise's state.
**Example:** `Promise.resolve(2).then(x => x * 2)` returns a different Promise that eventually fulfills with `4`.
**Interview:** `.then()` returns a new Promise. The value you return becomes the next fulfillment value; throwing or returning a rejected Promise moves the chain to rejection. Every `.then` call creates a new Promise. The key idea is: Each `.then` creates the next Promise in the chain.
**Remember:** Each `.then` creates the next Promise in the chain.

## What does an `async` function return?
**Answer:** An `async` function always returns a Promise. A normal return value becomes a fulfilled Promise; a thrown error becomes a rejected Promise.
**Connect:** Declaring a function `async` guarantees that callers receive a Promise. A returned plain value becomes a fulfilled Promise value, while a thrown error becomes a rejection, so callers get one consistent asynchronous contract.
**Example:** `async function getCount(){ return 3 }` returns a Promise; `await getCount()` evaluates to `3`.
**Interview:** An `async` function always returns a Promise. A normal return value becomes a fulfilled Promise; a thrown error becomes a rejected Promise. Declaring a function `async` guarantees that callers receive a Promise. The key idea is: `async` wraps the result in a Promise.
**Remember:** `async` wraps the result in a Promise.

## What does `await` do?
**Answer:** `await` pauses that async function until the awaited value settles without blocking the JavaScript thread. The rest of the function continues later as asynchronous work.
**Connect:** `await` pauses *that async function's continuation*, not the JavaScript thread. Control returns to the caller/runtime; once the awaited value settles, the rest of the async function is scheduled as a microtask.
**Example:** While `await fetch(...)` is waiting, click handlers and other JavaScript can still run on later event-loop turns.
**Interview:** `await` pauses that async function until the awaited value settles without blocking the JavaScript thread. The rest of the function continues later as asynchronous work. `await` pauses *that async function's continuation*, not the JavaScript thread. The key idea is: Pause the function, not the whole thread.
**Remember:** Pause the function, not the whole thread.

## How do you handle errors with `async/await`?
**Answer:** Use normal Promise handling, commonly `try/catch` around awaited operations or let the async function reject and handle it at a higher layer.
**Connect:** A rejected Promise behaves like a thrown error at the `await` point. You can catch it locally with `try/catch`, let it propagate to the caller, or handle it at a higher boundary; the right choice depends on who can meaningfully recover.
**Example:** Wrap an API call in `try/catch` when the component can show a specific retry state; otherwise let a data layer or error boundary own the policy.
**Interview:** Use normal Promise handling, commonly `try/catch` around awaited operations or let the async function reject and handle it at a higher layer. A rejected Promise behaves like a thrown error at the `await` point. The key idea is: Rejected Promise behaves like a thrown error at `await`.
**Remember:** Rejected Promise behaves like a thrown error at `await`.

## What is `Promise.all()`?
**Answer:** `Promise.all` waits for all input Promises to fulfill and returns their results in input order. It rejects as soon as one input rejects.
**Connect:** `Promise.all` is for independent operations whose results are all required. It starts from already-created Promises and fulfills with results in input order, not completion order; its returned Promise rejects as soon as one input rejects.
**Example:** Fetch user, permissions, and settings concurrently with `Promise.all` when none depends on another.
**Interview:** `Promise.all` waits for all input Promises to fulfill and returns their results in input order. It rejects as soon as one input rejects. `Promise.all` is for independent operations whose results are all required. The key idea is: All succeed or the combined Promise rejects.
**Remember:** All succeed or the combined Promise rejects.

## What is `Promise.allSettled()`?
**Answer:** `Promise.allSettled` waits for every input to finish and returns each fulfillment or rejection result. One failure does not reject the combined operation.
**Connect:** `allSettled` waits for every input and gives you a status/result for each one. Use it when partial success is meaningful and one failure should not discard information about the other operations.
**Example:** Uploading five independent files can use `allSettled` so you can report exactly which files failed.
**Interview:** `Promise.allSettled` waits for every input to finish and returns each fulfillment or rejection result. One failure does not reject the combined operation. `allSettled` waits for every input and gives you a status/result for each one. The key idea is: Use when every outcome matters.
**Remember:** Use when every outcome matters.

## What is `Promise.race()`?
**Answer:** `Promise.race` settles with the first input Promise that settles, whether that first result is fulfilled or rejected.
**Connect:** `race` settles with the first input Promise to settle, whether that is success or failure. It is commonly used to race an operation against a timeout signal, though cancellation of the losing operation must be handled separately.
**Example:** Race a fetch with a timeout Promise; then abort the fetch if the timeout wins.
**Interview:** `Promise.race` settles with the first input Promise that settles, whether that first result is fulfilled or rejected. `race` settles with the first input Promise to settle, whether that is success or failure. The key idea is: First settlement wins.
**Remember:** First settlement wins.

## What is `Promise.any()`?
**Answer:** `Promise.any` fulfills with the first input that fulfills. It rejects only when every input rejects.
**Connect:** `Promise.any` looks for the first *successful* result. Rejections are ignored until every input rejects, at which point it rejects with an `AggregateError`.
**Example:** Query multiple equivalent mirrors and use whichever successfully responds first.
**Interview:** `Promise.any` fulfills with the first input that fulfills. It rejects only when every input rejects. `Promise.any` looks for the first *successful* result. The key idea is: First success wins.
**Remember:** First success wins.

## Sequential vs parallel async execution?
**Answer:** Sequential execution waits for one operation before starting the next. Parallel or concurrent execution starts independent operations together and then waits for their results.
**Connect:** Sequential execution waits for one operation before starting the next, which is required when later work depends on earlier results. Independent work should usually start together so total latency approaches the slowest operation rather than the sum of all operations.
**Example:** Three independent 500 ms requests take roughly 1.5 s sequentially but around 500 ms when run concurrently, ignoring overhead.
**Interview:** Sequential execution waits for one operation before starting the next. Parallel or concurrent execution starts independent operations together and then waits for their results. Sequential execution waits for one operation before starting the next, which is required when later work depends on earlier results.
**Remember:** Do not serialize independent work accidentally.

## What is `AbortController`?
**Answer:** `AbortController` provides an `AbortSignal` that APIs such as `fetch` can use to cancel or stop work when it is no longer needed.
**Connect:** AbortController gives the caller ownership over cancellation. You pass its `signal` to APIs that support it and call `abort()` when the result is no longer useful, reducing wasted work and preventing stale updates.
**Example:** In an effect, abort the previous fetch during cleanup when the search query changes.
**Interview:** `AbortController` provides an `AbortSignal` that APIs such as `fetch` can use to cancel or stop work when it is no longer needed. AbortController gives the caller ownership over cancellation. The key idea is: Signal cancellation to async work.
**Remember:** Signal cancellation to async work.

## What is a race condition in frontend code?
**Answer:** A race condition happens when the final state depends on which asynchronous operation finishes first. For example, an older search request can arrive after a newer one and overwrite fresh results.
**Connect:** A race happens when correctness depends on which asynchronous operation finishes first. Frontends commonly hit this when a newer request starts before an older one completes and the older response arrives last.
**Example:** The user searches `cat`, then quickly `car`; if the slower `cat` response arrives last and overwrites `car`, the UI is stale.
**Interview:** A race condition happens when the final state depends on which asynchronous operation finishes first. For example, an older search request can arrive after a newer one and overwrite fresh results. A race happens when correctness depends on which asynchronous operation finishes first.
**Remember:** Completion order differs from intent order.

## How can you prevent stale request results?
**Answer:** Cancel obsolete requests, track a request/version ID, or ignore results that no longer match the latest user intent.
**Connect:** Cancellation is one solution; another is to tag requests with a sequence/version and only apply the latest result. The key invariant is that an outdated operation must not be allowed to commit newer UI state.
**Example:** Keep a request ID and ignore a response when its ID is not the most recent one.
**Interview:** Cancel obsolete requests, track a request/version ID, or ignore results that no longer match the latest user intent. Cancellation is one solution; another is to tag requests with a sequence/version and only apply the latest result. The key idea is: Only the latest relevant request may commit state.
**Remember:** Only the latest relevant request may commit state.

## What is callback hell?
**Answer:** Callback hell is deeply nested asynchronous callback code that becomes hard to read, compose, and handle errors in. Promises and async/await flatten that control flow.
**Connect:** The problem is not callbacks themselves but deeply nested control flow and error handling. Promises and `async/await` flatten the flow so sequencing and failures can be expressed in one readable path.
**Example:** Instead of nesting `getUser(() => getOrders(() => ...))`, await each dependent operation in one async function.
**Interview:** Callback hell is deeply nested asynchronous callback code that becomes hard to read, compose, and handle errors in. Promises and async/await flatten that control flow. The problem is not callbacks themselves but deeply nested control flow and error handling. The key idea is: Nested callbacks make control flow hard to see.
**Remember:** Nested callbacks make control flow hard to see.
