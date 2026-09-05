---
title: "State & Server Data"
order: 10
---
## Local state vs global state?
**Answer:** Local state belongs close to the component or feature that owns it. Global/shared state is appropriate when distant parts of the app truly need the same client-side source of truth.
**Connect:** Choose the narrowest owner that needs the data. Local state is easier to reason about because fewer components can change it; global/shared state is justified when distant parts of the app genuinely coordinate around the same client-owned value.
**Example:** A modal's open tab is local; an authenticated user's session may be shared application state.
**Interview:** Local state belongs close to the component or feature that owns it. Global/shared state is appropriate when distant parts of the app truly need the same client-side source of truth. Choose the narrowest owner that needs the data. The key idea is: Keep state as local as practical.
**Remember:** Keep state as local as practical.

## Client state vs server state?
**Answer:** Client state is owned by the UI, such as selected tabs or draft input. Server state is remote data owned by a backend and has concerns such as fetching, caching, staleness, retries, and synchronization.
**Connect:** Client state is authoritative in the frontend, while server state is only a cached snapshot of data owned remotely. Server data therefore has concerns such as freshness, refetching, deduplication, mutation synchronization, and retries that ordinary UI state does not.
**Example:** A dropdown's open/closed flag is client state; the customer's account balance fetched from an API is server state.
**Interview:** Client state is owned by the UI, such as selected tabs or draft input. Server state is remote data owned by a backend and has concerns such as fetching, caching, staleness, retries, and synchronization. Client state is authoritative in the frontend, while server state is only a cached snapshot of data owned remotely.
**Remember:** UI-owned data vs remote-owned cached data.

## Why can Context be a poor global state solution?
**Answer:** A large frequently changing provider can rerender many consumers and lacks specialized state features. Context is a transport mechanism, not automatically a full state architecture.
**Connect:** Context is a transport/subscription mechanism, not a full state architecture. A large frequently changing provider can create broad rerenders and does not itself provide selectors, async cache semantics, devtools, or normalized updates.
**Example:** Theme is a great Context value; a high-frequency trading dashboard's entire mutable data model is usually not.
**Interview:** A large frequently changing provider can rerender many consumers and lacks specialized state features. Context is a transport mechanism, not automatically a full state architecture. Context is a transport/subscription mechanism, not a full state architecture. The key idea is: Context broadcasts values; it is not a universal store.
**Remember:** Context broadcasts values; it is not a universal store.

## What problem does Redux solve?
**Answer:** Redux centralizes client state updates through predictable actions and reducers, which can help with complex shared state, debugging, and cross-feature coordination.
**Connect:** Redux centralizes predictable client-state transitions around one store and explicit updates, with strong tooling and selector patterns. It is most valuable when complex shared client state needs coordination, debugging, middleware, or consistent update rules.
**Example:** A multi-step editor with shared entities and many distant actions may benefit; a single form often does not need Redux.
**Interview:** Redux centralizes client state updates through predictable actions and reducers, which can help with complex shared state, debugging, and cross-feature coordination. Redux centralizes predictable client-state transitions around one store and explicit updates, with strong tooling and selector patterns.
**Remember:** Predictable shared client state transitions.

## Why does Redux encourage immutable updates?
**Answer:** Immutable updates make state transitions predictable and allow reference equality checks to efficiently detect which values changed.
**Connect:** Immutable updates make state-history snapshots meaningful and let React/Redux detect changes through reference equality. Redux Toolkit uses Immer so you can write mutation-like syntax while it produces immutable next state under the hood.
**Example:** Updating one entity creates new references only along the changed path, allowing selectors/components to reuse unchanged parts.
**Interview:** Immutable updates make state transitions predictable and allow reference equality checks to efficiently detect which values changed. Immutable updates make state-history snapshots meaningful and let React/Redux detect changes through reference equality. The key idea is: New references make change detection straightforward.
**Remember:** New references make change detection straightforward.

## What problem does TanStack Query solve?
**Answer:** It manages server-state fetching and caching: loading/error states, deduplication, refetching, staleness, invalidation, retries, mutations, and cache lifecycle.
**Connect:** TanStack Query treats remote data as a cache with lifecycle rules rather than as generic global state. It manages request status, deduplication, freshness, background refetching, retries, garbage collection, mutations, and invalidation around query keys.
**Example:** Two components asking for the same `['user', id]` query can share the cached result/request instead of each building its own fetch state.
**Interview:** It manages server-state fetching and caching: loading/error states, deduplication, refetching, staleness, invalidation, retries, mutations, and cache lifecycle. TanStack Query treats remote data as a cache with lifecycle rules rather than as generic global state.
**Remember:** A server-state cache, not just fetch wrapper.

## What is stale data in a query cache?
**Answer:** Stale means cached data may need revalidation according to the cache policy. It does not necessarily mean the data has been deleted or is definitely wrong.
**Connect:** Stale does not mean deleted or unusable; it means the library considers the cached value old enough that it may refetch according to policy. Stale data can still be displayed immediately while a fresh request happens in the background.
**Example:** Return cached project data instantly on remount, then refetch because its freshness window has expired.
**Interview:** Stale means cached data may need revalidation according to the cache policy. It does not necessarily mean the data has been deleted or is definitely wrong. Stale does not mean deleted or unusable; it means the library considers the cached value old enough that it may refetch according to policy.
**Remember:** Stale = eligible for refresh, not absent.

## What is `staleTime`?
**Answer:** `staleTime` controls how long fetched data is considered fresh before it becomes stale and can refetch according to query behavior.
**Connect:** `staleTime` is the period after a successful fetch during which query data is considered fresh. Increasing it can reduce refetches for data that changes slowly; it is separate from how long unused cache data is retained before garbage collection.
**Example:** Country metadata might have a long staleTime, while a live order status may need a very short one.
**Interview:** `staleTime` controls how long fetched data is considered fresh before it becomes stale and can refetch according to query behavior. `staleTime` is the period after a successful fetch during which query data is considered fresh. The key idea is: Freshness window.
**Remember:** Freshness window.

## What is query invalidation?
**Answer:** Invalidation marks cached data as needing revalidation so relevant queries can refetch and synchronize with the server after a mutation or external change.
**Connect:** Invalidation marks matching cached queries as stale and can trigger refetching for active observers. It is a way to say 'a mutation may have made this cached view outdated' without manually editing every dependent view.
**Example:** After creating a todo, invalidate the todo-list query so the authoritative list can be fetched again.
**Interview:** Invalidation marks cached data as needing revalidation so relevant queries can refetch and synchronize with the server after a mutation or external change. Invalidation marks matching cached queries as stale and can trigger refetching for active observers. The key idea is: Tell the cache: this data may be outdated.
**Remember:** Tell the cache: this data may be outdated.

## What is an optimistic update?
**Answer:** The UI updates immediately as if a mutation succeeded, then confirms with the server. If the mutation fails, the app rolls back or reconciles the optimistic state.
**Connect:** An optimistic update changes the UI/cache before the server confirms success, improving perceived latency. A robust implementation snapshots previous data, applies the optimistic value, rolls back on failure, and reconciles/refetches afterward.
**Example:** Toggle a like immediately, then revert and show an error if the API rejects the mutation.
**Interview:** The UI updates immediately as if a mutation succeeded, then confirms with the server. If the mutation fails, the app rolls back or reconciles the optimistic state. An optimistic update changes the UI/cache before the server confirms success, improving perceived latency.
**Remember:** Show expected success first, recover on failure.

## What is cache deduplication?
**Answer:** When multiple consumers request the same resource around the same time, a data layer can share the in-flight request/result instead of issuing duplicates.
**Connect:** Deduplication prevents multiple consumers from starting equivalent in-flight work for the same cache key. They subscribe to the same request/result, reducing network load and preventing duplicated loading state logic.
**Example:** If header and page body both need the same user query at once, the query cache can issue one request and share it.
**Interview:** When multiple consumers request the same resource around the same time, a data layer can share the in-flight request/result instead of issuing duplicates. Deduplication prevents multiple consumers from starting equivalent in-flight work for the same cache key.
**Remember:** One resource request can serve many consumers.

## What is normalized state?
**Answer:** Normalized state stores entities once, usually by ID, and references them from other structures. It can reduce duplication and simplify updates to shared entities.
**Connect:** Normalized state stores each entity once by ID and represents relationships with IDs. This avoids duplicating the same entity object in multiple collections, making updates consistent, though it adds lookup/selector complexity.
**Example:** Store `users.byId['42']` once and have team membership contain user IDs instead of copying the whole user into every team.
**Interview:** Normalized state stores entities once, usually by ID, and references them from other structures. It can reduce duplication and simplify updates to shared entities. Normalized state stores each entity once by ID and represents relationships with IDs. The key idea is: One entity record, many references.
**Remember:** One entity record, many references.
