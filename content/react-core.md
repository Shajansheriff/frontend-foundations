---
title: "React Core"
order: 8
---

## What problem does React solve?
**Answer:** React helps build state-driven user interfaces by letting you describe UI as components and keeping rendered output synchronized with state and props.
**Remember:** UI = function of state.

## What is declarative UI?
**Answer:** You describe what the UI should look like for the current state instead of manually issuing every DOM update required to get there.
**Remember:** Describe the result, not the DOM procedure.

## What is a React component?
**Answer:** A component is a reusable unit of UI logic and markup that receives inputs and returns React elements to describe what should render.
**Remember:** Reusable UI function.

## Props vs state?
**Answer:** Props are inputs received from a parent. State is data owned by a component that can change over time and trigger rendering.
**Remember:** Props come in; state lives here.

## What causes a React component to render?
**Answer:** A component renders when its state updates, its parent renders it again, or a context it consumes changes. Memoization can skip some parent-driven renders.
**Remember:** State, parent, context.

## Does a React render always change the DOM?
**Answer:** No. Rendering computes the next React tree. React then reconciles it with the previous tree and only commits necessary host DOM changes.
**Remember:** Render is calculation; commit is DOM work.

## What is reconciliation?
**Answer:** Reconciliation is React’s process for comparing the previous and next element trees to decide what can be preserved, updated, mounted, or removed.
**Remember:** Compare trees to decide identity and updates.

## What is the Virtual DOM?
**Answer:** It is a common term for React’s in-memory representation of UI elements used during rendering and reconciliation. It is not a second browser DOM.
**Remember:** In-memory UI description, not another real DOM.

## Why are keys needed in lists?
**Answer:** Keys give sibling elements stable identities across renders so React can correctly match old and new items.
**Remember:** Key answers: which old item is this new item?

## Why can an array index be a bad key?
**Answer:** If items are inserted, removed, or reordered, the same index can refer to a different logical item, causing state and DOM identity to move incorrectly.
**Remember:** Position is not stable identity.

## What happens when a component key changes?
**Answer:** React treats it as a different component identity, so the old component is unmounted and a new one is mounted with fresh local state.
**Remember:** New key = new identity.

## Why should React state be treated as immutable?
**Answer:** React relies heavily on value/reference changes to detect updates and support predictable rendering. Mutating existing state can hide changes and corrupt assumptions.
**Remember:** Create the next state; do not modify the previous state.

## What does `useState` return?
**Answer:** It returns the current state value and a setter function that requests a render with updated state.
**Remember:** Value + update function.

## Why use a functional state update?
**Answer:** When next state depends on previous state, the updater form receives the latest queued state and avoids stale calculations across batched updates.
**Remember:** `setCount(c => c + 1)` when next depends on previous.
```jsx
setCount(count + 1);   // uses this render's count
setCount(c => c + 1); // uses latest queued state
```

## What is batching in React?
**Answer:** React groups multiple state updates so they can produce fewer renders while preserving the intended final state.
**Remember:** Several updates, fewer renders.

## What is controlled vs uncontrolled input?
**Answer:** A controlled input gets its value from React state and reports changes back to React. An uncontrolled input keeps its current value in the DOM and is often read via a ref or form APIs.
**Remember:** React owns value vs DOM owns value.

## What is lifting state up?
**Answer:** Move shared state to the nearest common owner so multiple children can receive the same source of truth through props.
**Remember:** Shared state belongs at the nearest common owner.

## What is prop drilling?
**Answer:** Prop drilling is passing data through intermediate components mainly so deeper descendants can receive it.
**Remember:** Props travel through layers that do not really need them.

## What is Context?
**Answer:** Context lets a subtree read a value from a provider without passing that value through every intermediate component as a prop.
**Remember:** Broadcast a value through a subtree.

## What causes Context consumers to rerender?
**Answer:** Consumers rerender when the provider value they read changes according to React’s value comparison. Passing a freshly created object each render can therefore update all consumers.
**Remember:** Provider value identity matters.

## What is an Error Boundary?
**Answer:** An Error Boundary catches rendering errors in its descendant React tree and renders fallback UI instead of letting that subtree crash the whole interface.
**Remember:** Catch render failures at a UI boundary.

## What is a portal?
**Answer:** A portal renders React children into a different DOM container while keeping them in the same React tree for context and event semantics.
**Remember:** Different DOM location, same React ownership tree.

## What is hydration?
**Answer:** Hydration is when React attaches client-side behavior to server-rendered HTML and reconciles it with the client render.
**Remember:** Make server HTML interactive.

## What is a hydration mismatch?
**Answer:** It happens when the client’s initial rendered output does not match the server HTML closely enough, often because server and client used different data or environment-dependent values.
**Remember:** First client render must agree with server output.

## CSR vs SSR?
**Answer:** Client-side rendering generates most UI in the browser after JavaScript loads. Server-side rendering produces HTML on the server for the request and then the client can hydrate it.
**Remember:** Browser renders vs server sends rendered HTML.

## SSR vs SSG?
**Answer:** SSR renders at request time. Static generation renders ahead of requests and serves reusable prebuilt output until regeneration or rebuild.
**Remember:** Per request vs ahead of time.
