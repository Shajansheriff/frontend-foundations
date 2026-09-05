---
title: "React Hooks & Performance"
order: 9
---
## What is `useEffect` for?
**Answer:** `useEffect` synchronizes a component with an external system after React commits, such as subscriptions, browser APIs, timers, or network synchronization.
**Connect:** `useEffect` is for synchronizing React state/props with something outside React's pure render calculation: network subscriptions, browser APIs, timers, imperative widgets, etc. If a value can be derived during render, an effect is usually unnecessary.
**Example:** Subscribe to a WebSocket in an effect and unsubscribe in cleanup; compute `fullName` directly during render instead of setting it via an effect.
**Interview:** `useEffect` synchronizes a component with an external system after React commits, such as subscriptions, browser APIs, timers, or network synchronization. `useEffect` is for synchronizing React state/props with something outside React's pure render calculation: network subscriptions, browser APIs, timers, imperative widgets, etc.
**Remember:** Effects are for synchronization outside pure rendering.

## When does `useEffect` run?
**Answer:** After a committed render, React runs the effect when it first mounts and again when a dependency has changed, according to the dependency list.
**Connect:** After React commits a render, it schedules passive effects whose dependencies require them to run. Before rerunning an effect for changed dependencies, React runs the previous cleanup; cleanup also runs when the component unmounts.
**Example:** Changing `roomId` can cause the old room subscription cleanup to run, then a new subscription effect to start for the new room.
**Interview:** After a committed render, React runs the effect when it first mounts and again when a dependency has changed, according to the dependency list. After React commits a render, it schedules passive effects whose dependencies require them to run. The key idea is: Commit first, effect after.
**Remember:** Commit first, effect after.

## What does an empty dependency array mean?
**Answer:** It means the effect does not depend on reactive values, so it runs after the initial mount and cleanup runs on unmount. Development Strict Mode may intentionally repeat the setup/cleanup cycle.
**Connect:** An empty list says the effect does not depend on changing reactive values, so for that mount it has no dependency reason to rerun. Development Strict Mode can intentionally perform an extra setup/cleanup cycle to expose unsafe effects.
**Example:** Initialize a non-reactive third-party widget once per mount, and destroy it in cleanup.
**Interview:** It means the effect does not depend on reactive values, so it runs after the initial mount and cleanup runs on unmount. Development Strict Mode may intentionally repeat the setup/cleanup cycle. An empty list says the effect does not depend on changing reactive values, so for that mount it has no dependency reason to rerun.
**Remember:** Mount-style synchronization, not a magic lifecycle clone.

## What happens when `useEffect` has no dependency array?
**Answer:** The effect runs after every committed render of that component.
**Connect:** Without a dependency array, React schedules the effect after every committed render. If that effect sets state on every run, it can create a render-effect-update loop.
**Example:** An effect that calls `setValue(...)` after every render will keep causing new renders unless the update stabilizes/bails out.
**Interview:** The effect runs after every committed render of that component. Without a dependency array, React schedules the effect after every committed render. The key idea is: No dependency list = every render commit.
**Remember:** No dependency list = every render commit.

## Why does an effect return a cleanup function?
**Answer:** Cleanup undoes the previous synchronization, such as removing a listener, clearing a timer, disconnecting a subscription, or canceling/invalidating work.
**Connect:** Cleanup reverses the synchronization created by the effect. React runs it before the effect is replaced and on unmount, preventing duplicate subscriptions, dangling timers, and work tied to obsolete props.
**Example:** If setup adds `window.addEventListener`, cleanup should remove the same listener.
**Interview:** Cleanup undoes the previous synchronization, such as removing a listener, clearing a timer, disconnecting a subscription, or canceling/invalidating work. Cleanup reverses the synchronization created by the effect. The key idea is: Setup must have a matching undo.
**Remember:** Setup must have a matching undo.
```jsx
useEffect(() => {
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);
```

## What causes an infinite effect loop?
**Answer:** An effect updates state, that update causes a render, and a dependency changes again so the effect repeats. Unstable object/function dependencies are a common trigger.
**Connect:** The usual loop is: render → effect → state update → render → effect. An unstable dependency such as a new object/function every render can also retrigger the effect continuously. Fix the data flow rather than blindly removing dependencies.
**Example:** Creating `const options = {id}` during render and depending on `options` makes the dependency new each time; depend on `id` or create the object inside the effect when appropriate.
**Interview:** An effect updates state, that update causes a render, and a dependency changes again so the effect repeats. Unstable object/function dependencies are a common trigger. The usual loop is: render → effect → state update → render → effect. The key idea is: Effect changes something that makes itself run again.
**Remember:** Effect changes something that makes itself run again.

## What are the Rules of Hooks?
**Answer:** Call Hooks only at the top level of React components or custom Hooks, not inside conditions, loops, or arbitrary functions.
**Connect:** React identifies Hook state by call order within a component. Calling Hooks only at the top level of React components/custom Hooks preserves that stable order across renders and lets tooling analyze dependencies correctly.
**Example:** Do not put `useState` inside an `if`; put the condition around the behavior or returned UI instead.
**Interview:** Call Hooks only at the top level of React components or custom Hooks, not inside conditions, loops, or arbitrary functions. React identifies Hook state by call order within a component. The key idea is: Same Hook call order every render.
**Remember:** Same Hook call order every render.

## Why can Hooks not be called conditionally?
**Answer:** React associates Hook state with call order. Conditional calls can change that order between renders and make React match the wrong state to a Hook.
**Connect:** If a conditional changes whether a Hook call happens, every Hook after it can shift position between renders. React would no longer know which stored Hook state belongs to which call.
**Example:** Render 1 calls hooks A, B, C; render 2 skips B and calls A, C. Without the rule, React could mistakenly give C the old state for B.
**Interview:** React associates Hook state with call order. Conditional calls can change that order between renders and make React match the wrong state to a Hook. If a conditional changes whether a Hook call happens, every Hook after it can shift position between renders. The key idea is: Hook identity is based on stable call order.
**Remember:** Hook identity is based on stable call order.

## What is a custom Hook?
**Answer:** A custom Hook is a function whose name starts with `use` that composes React Hooks into reusable stateful or synchronization logic.
**Connect:** A custom Hook packages reusable stateful behavior while still participating in the calling component's Hook lifecycle. It shares logic, not one global state instance; each component call gets its own Hook state unless the Hook connects to a shared external source.
**Example:** `useOnlineStatus()` can encapsulate subscribing/unsubscribing to browser online events for any component that calls it.
**Interview:** A custom Hook is a function whose name starts with `use` that composes React Hooks into reusable stateful or synchronization logic. A custom Hook packages reusable stateful behavior while still participating in the calling component's Hook lifecycle. The key idea is: Reuse behavior, not rendered markup.
**Remember:** Reuse behavior, not rendered markup.

## What is `useRef`?
**Answer:** `useRef` returns a stable mutable object whose `.current` value survives renders. Updating it does not request a render.
**Connect:** A ref is a stable object whose `.current` survives renders without causing a render when changed. Use it for imperative handles or mutable information that should not itself drive what the UI displays.
**Example:** Store a DOM input node in a ref so a click handler can call `inputRef.current?.focus()`.
**Interview:** `useRef` returns a stable mutable object whose `.current` value survives renders. Updating it does not request a render. A ref is a stable object whose `.current` survives renders without causing a render when changed. The key idea is: Persistent box that does not drive UI.
**Remember:** Persistent box that does not drive UI.

## `useRef` vs `useState`?
**Answer:** Use state when a change should update what the user sees. Use a ref for mutable information that must survive renders but should not trigger rendering.
**Connect:** State participates in rendering: updating it asks React to render again. A ref persists a mutable `.current` value across renders without triggering a render, so it is better for imperative handles or bookkeeping the UI does not need to display.
**Example:** Keep visible `count` in state; keep a timer ID or DOM node in a ref.
**Interview:** Use state when a change should update what the user sees. Use a ref for mutable information that must survive renders but should not trigger rendering. State participates in rendering: updating it asks React to render again. The key idea is: State renders; ref remembers silently.
**Remember:** State renders; ref remembers silently.

## What is `useMemo`?
**Answer:** `useMemo` caches the result of a calculation between renders until its dependencies change. It is a performance optimization, not a semantic guarantee your logic should depend on.
**Connect:** `useMemo` caches the *result* of a calculation between renders while dependencies are unchanged. It is a performance optimization, not a semantic guarantee, so use it when recomputation or identity churn is measurably relevant.
**Example:** Memoize an expensive derived grouping of 50,000 rows based on the rows and filter inputs.
**Interview:** `useMemo` caches the result of a calculation between renders until its dependencies change. It is a performance optimization, not a semantic guarantee your logic should depend on. `useMemo` caches the *result* of a calculation between renders while dependencies are unchanged.
**Remember:** Cache a computed value when worthwhile.

## What is `useCallback`?
**Answer:** `useCallback` caches a function reference between renders until its dependencies change.
**Connect:** `useCallback` caches a function reference while dependencies are unchanged. The function still closes over values from the render in which that cached version was created, so dependencies must represent what it reads.
**Example:** Stabilize an `onSelect` callback passed to a memoized expensive child when function identity is otherwise causing useful memoization to fail.
**Interview:** `useCallback` caches a function reference between renders until its dependencies change. `useCallback` caches a function reference while dependencies are unchanged. The key idea is: Memoize function identity.
**Remember:** Memoize function identity.

## `useMemo` vs `useCallback`?
**Answer:** `useMemo` memoizes a computed value. `useCallback` memoizes the function itself.
**Connect:** The important point is *who decides when to call it*. You provide the function now, and another function or system invokes it later or during its own operation. A callback is not automatically asynchronous.
**Example:** The function passed to `map` is a synchronous callback; a click handler is an asynchronous/event-driven callback.
**Interview:** `useMemo` memoizes a computed value. `useCallback` memoizes the function itself. The important point is *who decides when to call it*. The key idea is: Value vs function reference.
**Remember:** Value vs function reference.

## What is `React.memo`?
**Answer:** `React.memo` can skip rerendering a component when its props compare equal to the previous props.
**Connect:** `React.memo` lets React skip rerendering a component when its props are shallowly equal to the previous props. It can save expensive renders, but comparison itself has cost and context/state changes can still rerender the component.
**Example:** Memoize a heavy row component when the parent rerenders frequently but most row props stay referentially stable.
**Interview:** `React.memo` can skip rerendering a component when its props compare equal to the previous props. `React.memo` lets React skip rerendering a component when its props are shallowly equal to the previous props. The key idea is: Memoize a component by props.
**Remember:** Memoize a component by props.

## Why can `React.memo` fail to help?
**Answer:** If props change identity every render, the child uses changing context, or the component is cheap, memoization may not skip work or may cost more than it saves.
**Connect:** Memo only helps when props stay equal and the render you're avoiding is meaningful. A new object/function prop every parent render breaks shallow equality, while context or the component's own state can independently trigger renders.
**Example:** `<MemoChild options={{mode:'x'}} />` passes a fresh object each time, so the prop comparison sees a change.
**Interview:** If props change identity every render, the child uses changing context, or the component is cheap, memoization may not skip work or may cost more than it saves. Memo only helps when props stay equal and the render you're avoiding is meaningful. The key idea is: Memoization needs stable inputs and measurable benefit.
**Remember:** Memoization needs stable inputs and measurable benefit.

## What is referential equality?
**Answer:** Objects and functions are equal by reference identity, not by having the same contents. Two separately created `{}` values are different references.
**Connect:** For objects/functions, equality is about whether two variables point to the same identity, not whether their contents look equal. React memoization and Hook dependency comparison often rely on this identity behavior.
**Example:** `{} === {}` is false, but `const a={}; const b=a; a===b` is true.
**Interview:** Objects and functions are equal by reference identity, not by having the same contents. Two separately created `{}` values are different references. For objects/functions, equality is about whether two variables point to the same identity, not whether their contents look equal.
**Remember:** Same shape does not mean same identity.

## Why can inline objects or functions affect memoized children?
**Answer:** A new object or function reference is created on each parent render, so shallow prop comparison sees the prop as changed even if its behavior/content looks equivalent.
**Connect:** Every render executes the object literal/function expression again, producing a new identity. If a memoized child receives that value as a prop, shallow comparison sees it as changed even when the contents/behavior are equivalent.
**Example:** Only stabilize the value when the child is actually expensive or identity is semantically needed; otherwise the memoization can cost more complexity than it saves.
**Interview:** A new object or function reference is created on each parent render, so shallow prop comparison sees the prop as changed even if its behavior/content looks equivalent. Every render executes the object literal/function expression again, producing a new identity.
**Remember:** Fresh reference looks like a changed prop.

## What is a stale closure in React?
**Answer:** A callback can capture state or props from the render where it was created and later run with those older values.
**Connect:** Every render creates new functions that close over that render's state/props snapshot. If an old function is kept by a timer, subscription, or incorrectly specified effect, it can later read values from an older render even though the UI has moved on.
**Example:** An interval effect created with `count = 0` and no changing dependency may keep logging `0` because its callback closes over that render.
**Interview:** A callback can capture state or props from the render where it was created and later run with those older values. Every render creates new functions that close over that render's state/props snapshot. The key idea is: Closures remember a render snapshot.
**Remember:** Closures remember a render snapshot.

## How do you avoid stale closure bugs?
**Answer:** Use correct dependencies, functional state updates when appropriate, refs for non-rendering mutable latest values, or newer patterns such as Effect Events when the use case fits.
**Connect:** Prefer the correct dependencies so React replaces the callback/effect when its reactive inputs change. For state updates, functional setters can avoid reading stale state; refs can hold the latest value when a stable callback genuinely needs mutable latest data.
**Example:** For an interval increment, `setCount(c => c + 1)` avoids closing over a particular `count` value.
**Interview:** Use correct dependencies, functional state updates when appropriate, refs for non-rendering mutable latest values, or newer patterns such as Effect Events when the use case fits. Prefer the correct dependencies so React replaces the callback/effect when its reactive inputs change.
**Remember:** Make the callback read the right source of truth.

## How do you avoid request race conditions in an effect?
**Answer:** Abort obsolete requests or ignore results from effects that have already been cleaned up so older responses cannot overwrite newer state.
**Connect:** Effects can start work for render A and then render B before A finishes. Cleanup should abort A when possible, or the completion handler should verify it still belongs to the latest request before committing state.
**Example:** When `userId` changes, abort the fetch for the old user in cleanup so its late response cannot overwrite the new user's data.
**Interview:** Abort obsolete requests or ignore results from effects that have already been cleaned up so older responses cannot overwrite newer state. Effects can start work for render A and then render B before A finishes. The key idea is: Only current effect instance may commit its result.
**Remember:** Only current effect instance may commit its result.

## Why does Strict Mode run some logic twice in development?
**Answer:** React intentionally performs extra development checks such as setup/cleanup cycles to expose impure rendering and missing effect cleanup. Production does not repeat work for that reason.
**Connect:** Development Strict Mode deliberately stresses certain lifecycle logic by performing extra render/setup-cleanup cycles. The goal is to reveal code that is not pure or effects that do not clean themselves up correctly; production does not simply double every effect forever.
**Example:** If an effect adds a subscription but cleanup forgets to remove it, the development double cycle makes the duplicate subscription obvious.
**Interview:** React intentionally performs extra development checks such as setup/cleanup cycles to expose impure rendering and missing effect cleanup. Production does not repeat work for that reason. Development Strict Mode deliberately stresses certain lifecycle logic by performing extra render/setup-cleanup cycles.
**Remember:** Development stress test for purity and cleanup.

## What is list virtualization?
**Answer:** Virtualization renders only the visible portion of a large list plus a small buffer instead of mounting every row at once.
**Connect:** Virtualization renders only the visible window plus a small buffer while representing the rest logically. It reduces DOM node count, layout, paint, and React work for very large lists, at the cost of measurement/accessibility/scrolling complexity.
**Example:** A 100,000-row table might keep only 30–80 row elements mounted around the viewport.
**Interview:** Virtualization renders only the visible portion of a large list plus a small buffer instead of mounting every row at once. Virtualization renders only the visible window plus a small buffer while representing the rest logically. The key idea is: Render the window, not the whole dataset.
**Remember:** Render the window, not the whole dataset.

## When should you virtualize a list?
**Answer:** When DOM size and rendering/layout cost from a large list become measurable. Do not add virtualization complexity to small lists without need.
**Connect:** Virtualize when DOM/rendering cost from a large visible list is actually significant. For a few dozen or even a few hundred simple rows, virtualization can add more complexity than value; measure first.
**Example:** Profile scrolling and render time; if thousands of mounted rows dominate work, virtualization is a strong candidate.
**Interview:** When DOM size and rendering/layout cost from a large list become measurable. Do not add virtualization complexity to small lists without need. Virtualize when DOM/rendering cost from a large visible list is actually significant. The key idea is: Use it for large visible collections, based on measurement.
**Remember:** Use it for large visible collections, based on measurement.

## How do you diagnose unnecessary React renders?
**Answer:** Use React DevTools Profiler, inspect which components render and why, then fix unstable props, overly broad state/context, or expensive computations where evidence shows a problem.
**Connect:** Use React DevTools Profiler to see what rendered, how long it took, and often why. Then inspect whether the trigger is parent rendering, state, context, or unstable props before reaching for memoization.
**Example:** Find a slow child that rerenders on unrelated parent state, then decide whether moving state, splitting context, or memoization gives the cleanest fix.
**Interview:** Use React DevTools Profiler, inspect which components render and why, then fix unstable props, overly broad state/context, or expensive computations where evidence shows a problem. Use React DevTools Profiler to see what rendered, how long it took, and often why.
**Remember:** Profile first, optimize the proven hotspot.
