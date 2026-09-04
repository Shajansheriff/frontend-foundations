---
title: "State & Server Data"
order: 10
---

## Local state vs global state?
**Answer:** Local state belongs close to the component or feature that owns it. Global/shared state is appropriate when distant parts of the app truly need the same client-side source of truth.
**Remember:** Keep state as local as practical.

## Client state vs server state?
**Answer:** Client state is owned by the UI, such as selected tabs or draft input. Server state is remote data owned by a backend and has concerns such as fetching, caching, staleness, retries, and synchronization.
**Remember:** UI-owned data vs remote-owned cached data.

## Why can Context be a poor global state solution?
**Answer:** A large frequently changing provider can rerender many consumers and lacks specialized state features. Context is a transport mechanism, not automatically a full state architecture.
**Remember:** Context broadcasts values; it is not a universal store.

## What problem does Redux solve?
**Answer:** Redux centralizes client state updates through predictable actions and reducers, which can help with complex shared state, debugging, and cross-feature coordination.
**Remember:** Predictable shared client state transitions.

## Why does Redux encourage immutable updates?
**Answer:** Immutable updates make state transitions predictable and allow reference equality checks to efficiently detect which values changed.
**Remember:** New references make change detection straightforward.

## What problem does TanStack Query solve?
**Answer:** It manages server-state fetching and caching: loading/error states, deduplication, refetching, staleness, invalidation, retries, mutations, and cache lifecycle.
**Remember:** A server-state cache, not just fetch wrapper.

## What is stale data in a query cache?
**Answer:** Stale means cached data may need revalidation according to the cache policy. It does not necessarily mean the data has been deleted or is definitely wrong.
**Remember:** Stale = eligible for refresh, not absent.

## What is `staleTime`?
**Answer:** `staleTime` controls how long fetched data is considered fresh before it becomes stale and can refetch according to query behavior.
**Remember:** Freshness window.

## What is query invalidation?
**Answer:** Invalidation marks cached data as needing revalidation so relevant queries can refetch and synchronize with the server after a mutation or external change.
**Remember:** Tell the cache: this data may be outdated.

## What is an optimistic update?
**Answer:** The UI updates immediately as if a mutation succeeded, then confirms with the server. If the mutation fails, the app rolls back or reconciles the optimistic state.
**Remember:** Show expected success first, recover on failure.

## What is cache deduplication?
**Answer:** When multiple consumers request the same resource around the same time, a data layer can share the in-flight request/result instead of issuing duplicates.
**Remember:** One resource request can serve many consumers.

## What is normalized state?
**Answer:** Normalized state stores entities once, usually by ID, and references them from other structures. It can reduce duplication and simplify updates to shared entities.
**Remember:** One entity record, many references.
