---
title: "React Core"
order: 8
---
## What problem does React solve?
**Answer:** React helps build state-driven user interfaces by letting you describe UI as components and keeping rendered output synchronized with state and props.
**Connect:** React gives you a way to describe UI as a function of state instead of manually keeping many DOM mutations synchronized. The main value is composability and predictable updates as state changes, not simply 'faster DOM'.
**Example:** Rather than manually create/remove a loading spinner, render `{loading ? <Spinner/> : <Results/>}` and let React reconcile the change.
**Interview:** React helps build state-driven user interfaces by letting you describe UI as components and keeping rendered output synchronized with state and props. React gives you a way to describe UI as a function of state instead of manually keeping many DOM mutations synchronized.
**Remember:** UI = function of state.

## What is declarative UI?
**Answer:** You describe what the UI should look like for the current state instead of manually issuing every DOM update required to get there.
**Connect:** Declarative code describes the desired end state. React owns the transition from the previous UI to the next UI, which removes a large class of manual DOM bookkeeping from application code.
**Example:** Say 'when `isOpen` is true, render the dialog' instead of manually calling DOM methods in every code path that opens/closes it.
**Interview:** You describe what the UI should look like for the current state instead of manually issuing every DOM update required to get there. Declarative code describes the desired end state. The key idea is: Describe the result, not the DOM procedure.
**Remember:** Describe the result, not the DOM procedure.

## What is a React component?
**Answer:** A component is a reusable unit of UI logic and markup that receives inputs and returns React elements to describe what should render.
**Connect:** A component is a reusable unit that maps inputs/state to React elements and can own behavior. Treat components as boundaries around a coherent responsibility, not merely as a way to reduce line count.
**Example:** A `UserMenu` can own its open state and render trigger/menu UI while receiving the current user as props.
**Interview:** A component is a reusable unit of UI logic and markup that receives inputs and returns React elements to describe what should render. A component is a reusable unit that maps inputs/state to React elements and can own behavior. The key idea is: Reusable UI function.
**Remember:** Reusable UI function.

## Props vs state?
**Answer:** Props are inputs received from a parent. State is data owned by a component that can change over time and trigger rendering.
**Connect:** Props are inputs controlled by a parent; state is data the component itself asks React to remember between renders. Both participate in rendering, but ownership determines who should update them.
**Example:** A `Modal` may receive `title` as a prop while keeping an internal active-tab state.
**Interview:** Props are inputs received from a parent. State is data owned by a component that can change over time and trigger rendering. Props are inputs controlled by a parent; state is data the component itself asks React to remember between renders. The key idea is: Props come in; state lives here.
**Remember:** Props come in; state lives here.

## What causes a React component to render?
**Answer:** A component renders when its state updates, its parent renders it again, or a context it consumes changes. Memoization can skip some parent-driven renders.
**Connect:** A component can render because its state updates, its parent renders it again, a consumed context changes, or an external-store subscription tells React about a change. Rendering means React calls the component to produce a new description; it does not imply the DOM will change.
**Example:** If a parent rerenders, its ordinary child function is normally invoked again even when the child's props look the same, unless React can bail out via mechanisms such as memoization.
**Interview:** A component renders when its state updates, its parent renders it again, or a context it consumes changes. Memoization can skip some parent-driven renders. A component can render because its state updates, its parent renders it again, a consumed context changes, or an external-store subscription tells React about a change.
**Remember:** State, parent, context.

## Does a React render always change the DOM?
**Answer:** No. Rendering computes the next React tree. React then reconciles it with the previous tree and only commits necessary host DOM changes.
**Connect:** Render and commit are separate phases. React may execute component functions, compare the resulting tree with the previous one, and discover that no host DOM mutation is necessary.
**Example:** Changing parent state can rerun a child component while its resulting `<span>Hello</span>` stays identical in the DOM.
**Interview:** No. Rendering computes the next React tree. React then reconciles it with the previous tree and only commits necessary host DOM changes. Render and commit are separate phases. The key idea is: Render is calculation; commit is DOM work.
**Remember:** Render is calculation; commit is DOM work.

## What is reconciliation?
**Answer:** Reconciliation is React’s process for comparing the previous and next element trees to decide what can be preserved, updated, mounted, or removed.
**Connect:** Reconciliation is React deciding how a newly rendered element tree corresponds to the previous one. Element type and keys are important identity signals; React uses the comparison to decide what can be preserved and what must be inserted, updated, or removed.
**Example:** If a list item's key stays the same, React can associate the new element with the existing component instance/state; changing the key tells React it is a different identity.
**Interview:** Reconciliation is React’s process for comparing the previous and next element trees to decide what can be preserved, updated, mounted, or removed. Reconciliation is React deciding how a newly rendered element tree corresponds to the previous one. The key idea is: Compare trees to decide identity and updates.
**Remember:** Compare trees to decide identity and updates.

## What is the Virtual DOM?
**Answer:** It is a common term for React’s in-memory representation of UI elements used during rendering and reconciliation. It is not a second browser DOM.
**Connect:** The Virtual DOM is the in-memory React element/tree representation produced by renders. React compares representations to compute necessary host updates; it is an implementation model for declarative UI, not a magical DOM cache that is always faster than direct DOM operations.
**Example:** A state update creates a new React tree description; reconciliation determines which actual DOM nodes need changes.
**Interview:** It is a common term for React’s in-memory representation of UI elements used during rendering and reconciliation. It is not a second browser DOM. The Virtual DOM is the in-memory React element/tree representation produced by renders. The key idea is: In-memory UI description, not another real DOM.
**Remember:** In-memory UI description, not another real DOM.

## Why are keys needed in lists?
**Answer:** Keys give sibling elements stable identities across renders so React can correctly match old and new items.
**Connect:** Keys give sibling elements stable identity across renders. React needs that identity to distinguish 'this same item moved' from 'this item disappeared and another appeared here', which affects preserved component state and DOM reuse.
**Example:** Use a database row ID as the key so reordering rows moves the right component/state instead of attaching state to positions.
**Interview:** Keys give sibling elements stable identities across renders so React can correctly match old and new items. Keys give sibling elements stable identity across renders. The key idea is: Key answers: which old item is this new item?.
**Remember:** Key answers: which old item is this new item?

## Why can an array index be a bad key?
**Answer:** If items are inserted, removed, or reordered, the same index can refer to a different logical item, causing state and DOM identity to move incorrectly.
**Connect:** An index describes position, not identity. When items are inserted, deleted, or reordered, the same index can now refer to a different item, so local component state or DOM state can appear attached to the wrong row.
**Example:** Delete the first item from an editable list keyed by index and an input's local value may appear to jump to another item.
**Interview:** If items are inserted, removed, or reordered, the same index can refer to a different logical item, causing state and DOM identity to move incorrectly. An index describes position, not identity. The key idea is: Position is not stable identity.
**Remember:** Position is not stable identity.

## What happens when a component key changes?
**Answer:** React treats it as a different component identity, so the old component is unmounted and a new one is mounted with fresh local state.
**Connect:** A changed key tells React that the old component identity ended and a new one began. React unmounts the old subtree and mounts a fresh one, resetting its local state and effects.
**Example:** Setting `key={userId}` on a profile form can intentionally reset form state when switching to a different user.
**Interview:** React treats it as a different component identity, so the old component is unmounted and a new one is mounted with fresh local state. A changed key tells React that the old component identity ended and a new one began. The key idea is: New key = new identity.
**Remember:** New key = new identity.

## Why should React state be treated as immutable?
**Answer:** React relies heavily on value/reference changes to detect updates and support predictable rendering. Mutating existing state can hide changes and corrupt assumptions.
**Connect:** React relies heavily on identity/reference changes to know that state has changed and to make memoization predictable. Mutating an existing object and setting the same reference can hide changes from those mechanisms and makes previous render snapshots conceptually unstable.
**Example:** Instead of `user.name = x; setUser(user)`, use `setUser({...user, name:x})` so the new state has a new reference.
**Interview:** React relies heavily on value/reference changes to detect updates and support predictable rendering. Mutating existing state can hide changes and corrupt assumptions. React relies heavily on identity/reference changes to know that state has changed and to make memoization predictable.
**Remember:** Create the next state; do not modify the previous state.

## What does `useState` return?
**Answer:** It returns the current state value and a setter function that requests a render with updated state.
**Connect:** `useState` returns the value for the current render and a setter that queues a state update. The setter does not mutate the current render's local variable; React later renders again and gives that new render the updated value.
**Example:** `const [count, setCount] = useState(0)` gives `count` as this render's snapshot and `setCount` as the way to request the next state.
**Interview:** It returns the current state value and a setter function that requests a render with updated state. `useState` returns the value for the current render and a setter that queues a state update. The key idea is: Value + update function.
**Remember:** Value + update function.

## Why use a functional state update?
**Answer:** When next state depends on previous state, the updater form receives the latest queued state and avoids stale calculations across batched updates.
**Connect:** Use the functional form when the next value depends on the previous value. React supplies the latest queued state to the updater, which avoids stale-snapshot problems when multiple updates are batched.
**Example:** Calling `setCount(c => c + 1)` three times can increment by three; three `setCount(count + 1)` calls from one render may all compute the same next value.
**Interview:** When next state depends on previous state, the updater form receives the latest queued state and avoids stale calculations across batched updates. Use the functional form when the next value depends on the previous value. The key idea is: `setCount(c => c + 1)` when next depends on previous.
**Remember:** `setCount(c => c + 1)` when next depends on previous.
```jsx
setCount(count + 1);   // uses this render's count
setCount(c => c + 1); // uses latest queued state
```

## What is batching in React?
**Answer:** React groups multiple state updates so they can produce fewer renders while preserving the intended final state.
**Connect:** Batching groups multiple state updates so React can process them in fewer renders/commits. You should therefore think of setters as scheduling updates, not as immediate imperative assignments.
**Example:** A click handler can update two state variables and React can usually render the resulting combined state once.
**Interview:** React groups multiple state updates so they can produce fewer renders while preserving the intended final state. Batching groups multiple state updates so React can process them in fewer renders/commits. The key idea is: Several updates, fewer renders.
**Remember:** Several updates, fewer renders.

## What is controlled vs uncontrolled input?
**Answer:** A controlled input gets its value from React state and reports changes back to React. An uncontrolled input keeps its current value in the DOM and is often read via a ref or form APIs.
**Connect:** A controlled input gets its current value from React state and reports changes back to React; an uncontrolled input keeps its current value in the DOM and is read via a ref/form APIs. Controlled gives explicit synchronization; uncontrolled can be simpler and reduce per-keystroke state work.
**Example:** A search box with `value={query}` is controlled; `<input defaultValue='A' ref={ref}>` is uncontrolled after initialization.
**Interview:** A controlled input gets its value from React state and reports changes back to React. An uncontrolled input keeps its current value in the DOM and is often read via a ref or form APIs. A controlled input gets its current value from React state and reports changes back to React; an uncontrolled input keeps its current value in the DOM and is read via a ref/form APIs.
**Remember:** React owns value vs DOM owns value.

## What is lifting state up?
**Answer:** Move shared state to the nearest common owner so multiple children can receive the same source of truth through props.
**Connect:** When two sibling components need the same source of truth, move that state to their nearest common owner and pass data/actions down. The goal is one authoritative value, not putting everything globally.
**Example:** A filter panel and results list can share query state owned by their common page component.
**Interview:** Move shared state to the nearest common owner so multiple children can receive the same source of truth through props. When two sibling components need the same source of truth, move that state to their nearest common owner and pass data/actions down. The key idea is: Shared state belongs at the nearest common owner.
**Remember:** Shared state belongs at the nearest common owner.

## What is prop drilling?
**Answer:** Prop drilling is passing data through intermediate components mainly so deeper descendants can receive it.
**Connect:** Prop drilling is passing data through intermediate components that do not care about it only so deeper descendants can receive it. It is not automatically bad; it becomes a design problem when the chain is wide, deep, and frequently changing.
**Example:** A theme value passed through six layout components may be a good Context candidate; a page-specific callback passed through two levels may be perfectly clear as props.
**Interview:** Prop drilling is passing data through intermediate components mainly so deeper descendants can receive it. Prop drilling is passing data through intermediate components that do not care about it only so deeper descendants can receive it. The key idea is: Props travel through layers that do not really need them.
**Remember:** Props travel through layers that do not really need them.

## What is Context?
**Answer:** Context lets a subtree read a value from a provider without passing that value through every intermediate component as a prop.
**Connect:** Context lets descendants read a value from the nearest matching provider without explicit props at every intermediate level. It is best for values that truly belong to a subtree, but changing a provider value can rerender consumers.
**Example:** Locale, theme, or a scoped form API are common Context-shaped values.
**Interview:** Context lets a subtree read a value from a provider without passing that value through every intermediate component as a prop. Context lets descendants read a value from the nearest matching provider without explicit props at every intermediate level. The key idea is: Broadcast a value through a subtree.
**Remember:** Broadcast a value through a subtree.

## What causes Context consumers to rerender?
**Answer:** Consumers rerender when the provider value they read changes according to React’s value comparison. Passing a freshly created object each render can therefore update all consumers.
**Connect:** Consumers subscribe to the provider's value identity. If the provider supplies a newly created object every parent render, consumers can rerender even when the logical fields did not change, which is why provider value design matters.
**Example:** `<Provider value={{user, logout}}>` creates a new object each render; stabilize/split context only when that rerender cost is actually a problem.
**Interview:** Consumers rerender when the provider value they read changes according to React’s value comparison. Passing a freshly created object each render can therefore update all consumers. Consumers subscribe to the provider's value identity. The key idea is: Provider value identity matters.
**Remember:** Provider value identity matters.

## What is an Error Boundary?
**Answer:** An Error Boundary catches rendering errors in its descendant React tree and renders fallback UI instead of letting that subtree crash the whole interface.
**Connect:** An Error Boundary catches rendering/lifecycle errors in its descendant React tree and renders fallback UI instead of letting the whole application tree fail. It does not automatically catch every async event-handler or server error; those need their own handling paths.
**Example:** Wrap a dashboard widget so one broken chart can show an error state without taking down the entire dashboard.
**Interview:** An Error Boundary catches rendering errors in its descendant React tree and renders fallback UI instead of letting that subtree crash the whole interface. An Error Boundary catches rendering/lifecycle errors in its descendant React tree and renders fallback UI instead of letting the whole application tree fail.
**Remember:** Catch render failures at a UI boundary.

## What is a portal?
**Answer:** A portal renders React children into a different DOM container while keeping them in the same React tree for context and event semantics.
**Connect:** A portal keeps a child in the same React tree while placing its DOM nodes under a different DOM container. React context and event semantics still follow the React tree, which is why portals are useful for overlays without giving up component relationships.
**Example:** Render a modal into a top-level `#modal-root` so it escapes clipping/stacking issues in the page layout.
**Interview:** A portal renders React children into a different DOM container while keeping them in the same React tree for context and event semantics. A portal keeps a child in the same React tree while placing its DOM nodes under a different DOM container. The key idea is: Different DOM location, same React ownership tree.
**Remember:** Different DOM location, same React ownership tree.

## What is hydration?
**Answer:** Hydration is when React attaches client-side behavior to server-rendered HTML and reconciles it with the client render.
**Connect:** Hydration is React attaching client-side behavior to HTML that was already rendered on the server. React expects the initial client render to describe compatible markup so it can reuse those DOM nodes instead of rebuilding them.
**Example:** The server sends a rendered button; hydration attaches React's event handling so the existing button becomes interactive.
**Interview:** Hydration is when React attaches client-side behavior to server-rendered HTML and reconciles it with the client render. Hydration is React attaching client-side behavior to HTML that was already rendered on the server. The key idea is: Make server HTML interactive.
**Remember:** Make server HTML interactive.

## What is a hydration mismatch?
**Answer:** It happens when the client’s initial rendered output does not match the server HTML closely enough, often because server and client used different data or environment-dependent values.
**Connect:** A mismatch means the server-rendered markup and the client's first render disagree. Common causes are rendering time/random/browser-only values during render or using different data; React may warn and need to repair that subtree.
**Example:** Rendering `new Date().toLocaleString()` independently on server and client can produce different text and trigger a mismatch.
**Interview:** It happens when the client’s initial rendered output does not match the server HTML closely enough, often because server and client used different data or environment-dependent values. A mismatch means the server-rendered markup and the client's first render disagree.
**Remember:** First client render must agree with server output.

## CSR vs SSR?
**Answer:** Client-side rendering generates most UI in the browser after JavaScript loads. Server-side rendering produces HTML on the server for the request and then the client can hydrate it.
**Connect:** CSR builds most page UI in the browser after JavaScript loads; SSR produces initial HTML on the server for each request/render opportunity and then may hydrate it. SSR can improve initial content delivery/SEO but adds server work and hydration complexity.
**Example:** A marketing/product page may SSR initial content while subsequent interactions navigate client-side.
**Interview:** Client-side rendering generates most UI in the browser after JavaScript loads. Server-side rendering produces HTML on the server for the request and then the client can hydrate it. CSR builds most page UI in the browser after JavaScript loads; SSR produces initial HTML on the server for each request/render opportunity and then may hydrate it.
**Remember:** Browser renders vs server sends rendered HTML.

## SSR vs SSG?
**Answer:** SSR renders at request time. Static generation renders ahead of requests and serves reusable prebuilt output until regeneration or rebuild.
**Connect:** Both can send ready HTML, but SSR generates it at request time while SSG precomputes it ahead of requests (with framework-specific revalidation options). Choose based on how personalized/fresh the content must be and the cost of generating it.
**Example:** Documentation that changes on deploy is a strong SSG fit; a personalized account page is usually not.
**Interview:** SSR renders at request time. Static generation renders ahead of requests and serves reusable prebuilt output until regeneration or rebuild. Both can send ready HTML, but SSR generates it at request time while SSG precomputes it ahead of requests (with framework-specific revalidation options).
**Remember:** Per request vs ahead of time.
