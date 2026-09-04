---
title: "Async JavaScript"
order: 3
---

## What is the event loop?
**Answer:** The event loop coordinates the call stack and queued asynchronous callbacks. When the stack is empty, it lets queued work run according to task priority rules.
**Remember:** Stack runs now; queues wait; event loop coordinates.

## What are browser Web APIs?
**Answer:** Web APIs are browser capabilities such as timers, fetch, DOM events, and storage. They are provided by the browser, not by the JavaScript language itself.
**Remember:** JavaScript language + browser host APIs.

## What is a task or macrotask?
**Answer:** A task is a unit of queued work such as a timer callback, user event, or message event. The browser generally runs one task, then drains microtasks before moving on.
**Remember:** Timer callbacks live in the task world.

## What is a microtask?
**Answer:** A microtask is high-priority queued work that runs after the current JavaScript stack finishes and before the next task. Promise reactions and `queueMicrotask` use this queue.
**Remember:** Promises run before the next timer task.

## Why does a resolved Promise callback usually run before `setTimeout(..., 0)`?
**Answer:** Promise callbacks are microtasks. A zero-delay timer schedules a task, and microtasks are drained before the event loop takes the next task.
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
**Remember:** A container for a future result.

## What are the states of a Promise?
**Answer:** A Promise starts pending and becomes either fulfilled with a value or rejected with a reason. Once settled, it cannot change state again.
**Remember:** Pending → fulfilled or rejected.

## What does `.then()` return?
**Answer:** `.then()` returns a new Promise. The value you return becomes the next fulfillment value; throwing or returning a rejected Promise moves the chain to rejection.
**Remember:** Each `.then` creates the next Promise in the chain.

## What does an `async` function return?
**Answer:** An `async` function always returns a Promise. A normal return value becomes a fulfilled Promise; a thrown error becomes a rejected Promise.
**Remember:** `async` wraps the result in a Promise.

## What does `await` do?
**Answer:** `await` pauses that async function until the awaited value settles without blocking the JavaScript thread. The rest of the function continues later as asynchronous work.
**Remember:** Pause the function, not the whole thread.

## How do you handle errors with `async/await`?
**Answer:** Use normal Promise handling, commonly `try/catch` around awaited operations or let the async function reject and handle it at a higher layer.
**Remember:** Rejected Promise behaves like a thrown error at `await`.

## What is `Promise.all()`?
**Answer:** `Promise.all` waits for all input Promises to fulfill and returns their results in input order. It rejects as soon as one input rejects.
**Remember:** All succeed or the combined Promise rejects.

## What is `Promise.allSettled()`?
**Answer:** `Promise.allSettled` waits for every input to finish and returns each fulfillment or rejection result. One failure does not reject the combined operation.
**Remember:** Use when every outcome matters.

## What is `Promise.race()`?
**Answer:** `Promise.race` settles with the first input Promise that settles, whether that first result is fulfilled or rejected.
**Remember:** First settlement wins.

## What is `Promise.any()`?
**Answer:** `Promise.any` fulfills with the first input that fulfills. It rejects only when every input rejects.
**Remember:** First success wins.

## Sequential vs parallel async execution?
**Answer:** Sequential execution waits for one operation before starting the next. Parallel or concurrent execution starts independent operations together and then waits for their results.
**Remember:** Do not serialize independent work accidentally.

## What is `AbortController`?
**Answer:** `AbortController` provides an `AbortSignal` that APIs such as `fetch` can use to cancel or stop work when it is no longer needed.
**Remember:** Signal cancellation to async work.

## What is a race condition in frontend code?
**Answer:** A race condition happens when the final state depends on which asynchronous operation finishes first. For example, an older search request can arrive after a newer one and overwrite fresh results.
**Remember:** Completion order differs from intent order.

## How can you prevent stale request results?
**Answer:** Cancel obsolete requests, track a request/version ID, or ignore results that no longer match the latest user intent.
**Remember:** Only the latest relevant request may commit state.

## What is callback hell?
**Answer:** Callback hell is deeply nested asynchronous callback code that becomes hard to read, compose, and handle errors in. Promises and async/await flatten that control flow.
**Remember:** Nested callbacks make control flow hard to see.
