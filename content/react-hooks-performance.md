---
title: "React Hooks & Performance"
order: 9
---

## What is `useEffect` for?
**Answer:** `useEffect` synchronizes a component with an external system after React commits, such as subscriptions, browser APIs, timers, or network synchronization.
**Remember:** Effects are for synchronization outside pure rendering.

## When does `useEffect` run?
**Answer:** After a committed render, React runs the effect when it first mounts and again when a dependency has changed, according to the dependency list.
**Remember:** Commit first, effect after.

## What does an empty dependency array mean?
**Answer:** It means the effect does not depend on reactive values, so it runs after the initial mount and cleanup runs on unmount. Development Strict Mode may intentionally repeat the setup/cleanup cycle.
**Remember:** Mount-style synchronization, not a magic lifecycle clone.

## What happens when `useEffect` has no dependency array?
**Answer:** The effect runs after every committed render of that component.
**Remember:** No dependency list = every render commit.

## Why does an effect return a cleanup function?
**Answer:** Cleanup undoes the previous synchronization, such as removing a listener, clearing a timer, disconnecting a subscription, or canceling/invalidating work.
**Remember:** Setup must have a matching undo.
```jsx
useEffect(() => {
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);
```

## What causes an infinite effect loop?
**Answer:** An effect updates state, that update causes a render, and a dependency changes again so the effect repeats. Unstable object/function dependencies are a common trigger.
**Remember:** Effect changes something that makes itself run again.

## What are the Rules of Hooks?
**Answer:** Call Hooks only at the top level of React components or custom Hooks, not inside conditions, loops, or arbitrary functions.
**Remember:** Same Hook call order every render.

## Why can Hooks not be called conditionally?
**Answer:** React associates Hook state with call order. Conditional calls can change that order between renders and make React match the wrong state to a Hook.
**Remember:** Hook identity is based on stable call order.

## What is a custom Hook?
**Answer:** A custom Hook is a function whose name starts with `use` that composes React Hooks into reusable stateful or synchronization logic.
**Remember:** Reuse behavior, not rendered markup.

## What is `useRef`?
**Answer:** `useRef` returns a stable mutable object whose `.current` value survives renders. Updating it does not request a render.
**Remember:** Persistent box that does not drive UI.

## `useRef` vs `useState`?
**Answer:** Use state when a change should update what the user sees. Use a ref for mutable information that must survive renders but should not trigger rendering.
**Remember:** State renders; ref remembers silently.

## What is `useMemo`?
**Answer:** `useMemo` caches the result of a calculation between renders until its dependencies change. It is a performance optimization, not a semantic guarantee your logic should depend on.
**Remember:** Cache a computed value when worthwhile.

## What is `useCallback`?
**Answer:** `useCallback` caches a function reference between renders until its dependencies change.
**Remember:** Memoize function identity.

## `useMemo` vs `useCallback`?
**Answer:** `useMemo` memoizes a computed value. `useCallback` memoizes the function itself.
**Remember:** Value vs function reference.

## What is `React.memo`?
**Answer:** `React.memo` can skip rerendering a component when its props compare equal to the previous props.
**Remember:** Memoize a component by props.

## Why can `React.memo` fail to help?
**Answer:** If props change identity every render, the child uses changing context, or the component is cheap, memoization may not skip work or may cost more than it saves.
**Remember:** Memoization needs stable inputs and measurable benefit.

## What is referential equality?
**Answer:** Objects and functions are equal by reference identity, not by having the same contents. Two separately created `{}` values are different references.
**Remember:** Same shape does not mean same identity.

## Why can inline objects or functions affect memoized children?
**Answer:** A new object or function reference is created on each parent render, so shallow prop comparison sees the prop as changed even if its behavior/content looks equivalent.
**Remember:** Fresh reference looks like a changed prop.

## What is a stale closure in React?
**Answer:** A callback can capture state or props from the render where it was created and later run with those older values.
**Remember:** Closures remember a render snapshot.

## How do you avoid stale closure bugs?
**Answer:** Use correct dependencies, functional state updates when appropriate, refs for non-rendering mutable latest values, or newer patterns such as Effect Events when the use case fits.
**Remember:** Make the callback read the right source of truth.

## How do you avoid request race conditions in an effect?
**Answer:** Abort obsolete requests or ignore results from effects that have already been cleaned up so older responses cannot overwrite newer state.
**Remember:** Only current effect instance may commit its result.

## Why does Strict Mode run some logic twice in development?
**Answer:** React intentionally performs extra development checks such as setup/cleanup cycles to expose impure rendering and missing effect cleanup. Production does not repeat work for that reason.
**Remember:** Development stress test for purity and cleanup.

## What is list virtualization?
**Answer:** Virtualization renders only the visible portion of a large list plus a small buffer instead of mounting every row at once.
**Remember:** Render the window, not the whole dataset.

## When should you virtualize a list?
**Answer:** When DOM size and rendering/layout cost from a large list become measurable. Do not add virtualization complexity to small lists without need.
**Remember:** Use it for large visible collections, based on measurement.

## How do you diagnose unnecessary React renders?
**Answer:** Use React DevTools Profiler, inspect which components render and why, then fix unstable props, overly broad state/context, or expensive computations where evidence shows a problem.
**Remember:** Profile first, optimize the proven hotspot.
