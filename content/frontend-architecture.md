---
title: "Frontend Architecture"
order: 15
---

## How should you structure a large React application?
**Answer:** Organize around stable product/feature boundaries, keep shared primitives explicit, and make dependencies flow in understandable directions. The exact folder layout matters less than clear ownership and boundaries.
**Remember:** Structure should reveal ownership and dependency boundaries.

## Feature-based vs layer-based folders?
**Answer:** Feature-based organization keeps UI, hooks, tests, and data logic for one domain close together. Layer-based organization groups all components/services/etc. globally. Large products often benefit from feature boundaries with a small set of true shared layers.
**Remember:** Prefer locality for things that change together.

## Where should business logic live?
**Answer:** Keep domain logic outside presentation details when possible, in functions, hooks, model/service modules, or backend boundaries that can be tested and reused.
**Remember:** UI should orchestrate domain logic, not bury it in markup.

## What makes a component reusable?
**Answer:** A reusable component has a clear responsibility, a small intentional API, sensible defaults, composability, and avoids assumptions tied to one consumer.
**Remember:** Reuse comes from a good boundary, not maximum configurability.

## What is over-abstraction?
**Answer:** It is creating generalized layers before real repeated needs are understood, increasing indirection and configuration without reducing meaningful duplication.
**Remember:** Do not abstract hypothetical reuse.

## Component library vs design system?
**Answer:** A component library is an implementation collection. A design system also includes design principles, tokens, patterns, accessibility guidance, governance, and usage rules.
**Remember:** Components are part of a design system, not the whole system.

## How should a frontend API layer be designed?
**Answer:** Centralize cross-cutting concerns such as base URLs, auth headers, error mapping, cancellation, and typed request/response contracts while keeping endpoint/domain modules explicit.
**Remember:** One transport foundation, domain-specific API modules.

## Where should authentication logic live?
**Answer:** Keep credential/session handling and authorization policy at well-defined platform boundaries. UI components should consume authenticated user state and permissions rather than each implementing auth independently.
**Remember:** Centralize auth mechanics; expose simple state to features.

## How should frontend permissions be handled?
**Answer:** Use permissions to control UX, but never treat hidden UI as the security boundary. The backend must enforce authorization for every protected operation.
**Remember:** Frontend hides; backend authorizes.

## How do you prevent duplicate form submissions?
**Answer:** Disable or guard repeated client submission while a request is pending, and use server-side idempotency where duplicate requests could have important effects.
**Remember:** Client guard + server idempotency for real safety.

## How should loading, error, empty, and success states be designed?
**Answer:** Treat them as first-class product states with clear transitions and recovery actions rather than afterthoughts around the happy path.
**Remember:** Every async screen has more than a success state.

## What is a feature flag?
**Answer:** A feature flag separates code deployment from feature exposure, allowing controlled rollout, testing, kill switches, and gradual migration.
**Remember:** Deploy code now, enable behavior separately.

## How do you migrate a large frontend safely?
**Answer:** Migrate incrementally behind stable boundaries, preserve behavior with tests/telemetry, move one slice at a time, and avoid a long-lived all-or-nothing rewrite when possible.
**Remember:** Strangler-style migration beats a risky big bang.

## How do you make frontend code maintainable across teams?
**Answer:** Use clear ownership, consistent standards, typed contracts, stable shared primitives, automated tests/checks, observability, documentation for important decisions, and boundaries that prevent accidental coupling.
**Remember:** Scale teams with boundaries and feedback loops.

## What is separation of concerns?
**Answer:** Different responsibilities should have clear boundaries so changing one concern does not force unrelated parts to change.
**Remember:** Things that change for different reasons should not be tangled.

## What is dependency inversion in frontend architecture?
**Answer:** High-level domain logic should depend on stable abstractions/contracts rather than concrete low-level implementations, making infrastructure easier to replace and test.
**Remember:** Domain rules should not be trapped inside infrastructure details.

## What is an adapter layer?
**Answer:** An adapter translates one interface or data shape into the interface your application expects, isolating external APIs, SDKs, or legacy systems from the rest of the codebase.
**Remember:** Translate at the boundary so external quirks do not leak inward.

## When should you split a component?
**Answer:** Split when a piece has a distinct responsibility, independent state/behavior, meaningful reuse, or when extraction makes the parent easier to understand. Do not split purely to minimize line count.
**Remember:** Split by responsibility, not arbitrary size.
