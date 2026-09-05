---
title: "Frontend Architecture"
order: 15
---
## How should you structure a large React application?
**Answer:** Organize around stable product/feature boundaries, keep shared primitives explicit, and make dependencies flow in understandable directions. The exact folder layout matters less than clear ownership and boundaries.
**Connect:** Prefer boundaries aligned with product/domain features, with shared layers only for genuinely cross-cutting primitives. Keep related UI, hooks, tests, and data adapters close enough that a feature can evolve without hunting across many global folders.
**Example:** `features/billing/...` can own billing components/hooks/API mapping, while `components/ui/...` owns truly reusable design-system primitives.
**Interview:** Organize around stable product/feature boundaries, keep shared primitives explicit, and make dependencies flow in understandable directions. The exact folder layout matters less than clear ownership and boundaries. Prefer boundaries aligned with product/domain features, with shared layers only for genuinely cross-cutting primitives.
**Remember:** Structure should reveal ownership and dependency boundaries.

## Feature-based vs layer-based folders?
**Answer:** Feature-based organization keeps UI, hooks, tests, and data logic for one domain close together. Layer-based organization groups all components/services/etc. globally. Large products often benefit from feature boundaries with a small set of true shared layers.
**Connect:** Layer-based folders group by technical type (`components`, `hooks`, `services`), which is simple initially but scatters one product change across the tree. Feature-based grouping optimizes for change locality; shared technical layers still make sense for cross-cutting infrastructure.
**Example:** A 'cancel subscription' feature is easier to evolve when its component, mutation hook, tests, and domain mapping live near each other.
**Interview:** Feature-based organization keeps UI, hooks, tests, and data logic for one domain close together. Layer-based organization groups all components/services/etc. globally. Large products often benefit from feature boundaries with a small set of true shared layers. Layer-based folders group by technical type (`components`, `hooks`, `services`), which is simple initially but scatters one product change across the tree.
**Remember:** Prefer locality for things that change together.

## Where should business logic live?
**Answer:** Keep domain logic outside presentation details when possible, in functions, hooks, model/service modules, or backend boundaries that can be tested and reused.
**Connect:** Business rules should live in testable domain/service/hooks/modules rather than being tangled with presentation markup or low-level API response shapes. UI components can orchestrate user interaction, but important invariants should be reusable outside one view.
**Example:** Eligibility calculation should be a domain function; the button component merely asks whether the action is allowed and renders the result.
**Interview:** Keep domain logic outside presentation details when possible, in functions, hooks, model/service modules, or backend boundaries that can be tested and reused. Business rules should live in testable domain/service/hooks/modules rather than being tangled with presentation markup or low-level API response shapes.
**Remember:** UI should orchestrate domain logic, not bury it in markup.

## What makes a component reusable?
**Answer:** A reusable component has a clear responsibility, a small intentional API, sensible defaults, composability, and avoids assumptions tied to one consumer.
**Connect:** A reusable component has a clear responsibility, stable API, sensible defaults, accessibility, and composition points that match real repeated use cases. Reuse should come from demonstrated commonality, not predicting every future variation.
**Example:** A reusable Dialog owns focus/overlay semantics but lets callers compose title/body/actions instead of exposing 40 styling booleans.
**Interview:** A reusable component has a clear responsibility, a small intentional API, sensible defaults, composability, and avoids assumptions tied to one consumer. A reusable component has a clear responsibility, stable API, sensible defaults, accessibility, and composition points that match real repeated use cases.
**Remember:** Reuse comes from a good boundary, not maximum configurability.

## What is over-abstraction?
**Answer:** It is creating generalized layers before real repeated needs are understood, increasing indirection and configuration without reducing meaningful duplication.
**Connect:** Over-abstraction happens when an indirection/generalization costs more to understand and change than the duplication it removed. Warning signs are configuration-heavy components, generic names, one-off factories, and changes that require touching the abstraction for unrelated callers.
**Example:** Two similar forms may be clearer as two forms plus shared field primitives than one 'UniversalFormRenderer' driven by a giant schema.
**Interview:** It is creating generalized layers before real repeated needs are understood, increasing indirection and configuration without reducing meaningful duplication. Over-abstraction happens when an indirection/generalization costs more to understand and change than the duplication it removed.
**Remember:** Do not abstract hypothetical reuse.

## Component library vs design system?
**Answer:** A component library is an implementation collection. A design system also includes design principles, tokens, patterns, accessibility guidance, governance, and usage rules.
**Connect:** A component library is the coded collection of reusable UI pieces. A design system is broader: principles, tokens, accessibility rules, interaction patterns, content guidance, governance, and the components that implement them.
**Example:** Buttons in Storybook are part of the library; the rules for color, spacing, motion, naming, contribution, and when to use each button belong to the design system.
**Interview:** A component library is an implementation collection. A design system also includes design principles, tokens, patterns, accessibility guidance, governance, and usage rules. A component library is the coded collection of reusable UI pieces. The key idea is: Components are part of a design system, not the whole system.
**Remember:** Components are part of a design system, not the whole system.

## How should a frontend API layer be designed?
**Answer:** Centralize cross-cutting concerns such as base URLs, auth headers, error mapping, cancellation, and typed request/response contracts while keeping endpoint/domain modules explicit.
**Connect:** Keep transport details and backend response shapes behind a boundary that exposes domain-friendly functions/types to features. Centralize cross-cutting concerns such as base URL, auth, parsing, error normalization, and observability without turning one module into a giant god-client.
**Example:** `getCustomer(id): Customer` can map snake_case API JSON to the domain shape so UI components do not know transport quirks.
**Interview:** Centralize cross-cutting concerns such as base URLs, auth headers, error mapping, cancellation, and typed request/response contracts while keeping endpoint/domain modules explicit. Keep transport details and backend response shapes behind a boundary that exposes domain-friendly functions/types to features.
**Remember:** One transport foundation, domain-specific API modules.

## Where should authentication logic live?
**Answer:** Keep credential/session handling and authorization policy at well-defined platform boundaries. UI components should consume authenticated user state and permissions rather than each implementing auth independently.
**Connect:** Separate credential/session mechanics from presentation. A small auth/session layer can own login/logout/token refresh/session queries, while route/UI boundaries consume an authenticated-user abstraction; never rely on hidden UI alone for server authorization.
**Example:** The nav can hide an account menu based on session state, but the API must independently verify the session for protected data.
**Interview:** Keep credential/session handling and authorization policy at well-defined platform boundaries. UI components should consume authenticated user state and permissions rather than each implementing auth independently. Separate credential/session mechanics from presentation.
**Remember:** Centralize auth mechanics; expose simple state to features.

## How should frontend permissions be handled?
**Answer:** Use permissions to control UX, but never treat hidden UI as the security boundary. The backend must enforce authorization for every protected operation.
**Connect:** Frontend permission checks are for UX—showing or disabling actions the user cannot perform. Security must be enforced on the backend because a user can bypass your UI and call APIs directly. Centralize permission rules enough to avoid inconsistent UI decisions.
**Example:** Hide 'Delete organization' for non-admins, but the delete endpoint must still reject that request with proper authorization.
**Interview:** Use permissions to control UX, but never treat hidden UI as the security boundary. The backend must enforce authorization for every protected operation. Frontend permission checks are for UX—showing or disabling actions the user cannot perform. The key idea is: Frontend hides; backend authorizes.
**Remember:** Frontend hides; backend authorizes.

## How do you prevent duplicate form submissions?
**Answer:** Disable or guard repeated client submission while a request is pending, and use server-side idempotency where duplicate requests could have important effects.
**Connect:** Prevent accidental duplicates in the UI by disabling/locking the action while a request is in flight, but protect critical operations at the server boundary too with idempotency or uniqueness constraints. UI prevention alone cannot handle retries/double network delivery.
**Example:** Disable 'Pay' after click and send an idempotency key so retrying the POST cannot create a second charge.
**Interview:** Disable or guard repeated client submission while a request is pending, and use server-side idempotency where duplicate requests could have important effects. Prevent accidental duplicates in the UI by disabling/locking the action while a request is in flight, but protect critical operations at the server boundary too with idempotency or uniqueness constraints.
**Remember:** Client guard + server idempotency for real safety.

## How should loading, error, empty, and success states be designed?
**Answer:** Treat them as first-class product states with clear transitions and recovery actions rather than afterthoughts around the happy path.
**Connect:** Treat these as explicit product states, not afterthoughts around the happy path. Preserve useful previous data where appropriate, make errors actionable, distinguish truly empty from not-yet-loaded, and avoid layout shifts/spinners that destroy context.
**Example:** A search page can keep previous results visible with a subtle refreshing indicator instead of replacing everything with a full-screen spinner on every filter change.
**Interview:** Treat them as first-class product states with clear transitions and recovery actions rather than afterthoughts around the happy path. Treat these as explicit product states, not afterthoughts around the happy path. The key idea is: Every async screen has more than a success state.
**Remember:** Every async screen has more than a success state.

## What is a feature flag?
**Answer:** A feature flag separates code deployment from feature exposure, allowing controlled rollout, testing, kill switches, and gradual migration.
**Connect:** A feature flag separates code deployment from feature exposure. Flags support staged rollout, experiments, kill switches, or account-specific access, but stale flags become permanent branching debt and should have ownership/expiry plans.
**Example:** Ship the new checkout behind a 5% rollout flag, watch metrics/errors, then increase exposure without redeploying the code.
**Interview:** A feature flag separates code deployment from feature exposure, allowing controlled rollout, testing, kill switches, and gradual migration. A feature flag separates code deployment from feature exposure. The key idea is: Deploy code now, enable behavior separately.
**Remember:** Deploy code now, enable behavior separately.

## How do you migrate a large frontend safely?
**Answer:** Migrate incrementally behind stable boundaries, preserve behavior with tests/telemetry, move one slice at a time, and avoid a long-lived all-or-nothing rewrite when possible.
**Connect:** Prefer incremental seams over a big-bang rewrite. Establish boundaries/adapters, move one route/feature at a time, maintain compatibility, measure behavior/performance, and delete old paths once traffic has safely moved.
**Example:** Replace an old API client behind the same domain interface feature by feature instead of rewriting every caller in one release.
**Interview:** Migrate incrementally behind stable boundaries, preserve behavior with tests/telemetry, move one slice at a time, and avoid a long-lived all-or-nothing rewrite when possible. Prefer incremental seams over a big-bang rewrite. The key idea is: Strangler-style migration beats a risky big bang.
**Remember:** Strangler-style migration beats a risky big bang.

## How do you make frontend code maintainable across teams?
**Answer:** Use clear ownership, consistent standards, typed contracts, stable shared primitives, automated tests/checks, observability, documentation for important decisions, and boundaries that prevent accidental coupling.
**Connect:** Optimize for clear ownership, stable contracts, automated quality checks, shared primitives, documented architecture decisions, and observability. Avoid central abstractions that require one team to approve every ordinary product change.
**Example:** A design-system team can own primitives/contracts while product teams own feature composition, with lint/tests/CI enforcing common guarantees.
**Interview:** Use clear ownership, consistent standards, typed contracts, stable shared primitives, automated tests/checks, observability, documentation for important decisions, and boundaries that prevent accidental coupling. Optimize for clear ownership, stable contracts, automated quality checks, shared primitives, documented architecture decisions, and observability.
**Remember:** Scale teams with boundaries and feedback loops.

## What is separation of concerns?
**Answer:** Different responsibilities should have clear boundaries so changing one concern does not force unrelated parts to change.
**Connect:** Separate code by reasons to change, not by arbitrary file count. Rendering, domain rules, data transport, and persistence have different change drivers; keeping boundaries clear prevents a backend-response tweak from leaking into every visual component.
**Example:** Map API data in an adapter, compute eligibility in domain logic, and let the component focus on interaction/rendering.
**Interview:** Different responsibilities should have clear boundaries so changing one concern does not force unrelated parts to change. Separate code by reasons to change, not by arbitrary file count. The key idea is: Things that change for different reasons should not be tangled.
**Remember:** Things that change for different reasons should not be tangled.

## What is dependency inversion in frontend architecture?
**Answer:** High-level domain logic should depend on stable abstractions/contracts rather than concrete low-level implementations, making infrastructure easier to replace and test.
**Connect:** High-level product logic should depend on a stable abstraction rather than directly on low-level details. You can then swap the HTTP client, storage mechanism, or analytics implementation without rewriting the domain behavior.
**Example:** A checkout use case calls a `PaymentGateway` interface; production supplies Stripe-backed implementation and tests supply a fake.
**Interview:** High-level domain logic should depend on stable abstractions/contracts rather than concrete low-level implementations, making infrastructure easier to replace and test. High-level product logic should depend on a stable abstraction rather than directly on low-level details.
**Remember:** Domain rules should not be trapped inside infrastructure details.

## What is an adapter layer?
**Answer:** An adapter translates one interface or data shape into the interface your application expects, isolating external APIs, SDKs, or legacy systems from the rest of the codebase.
**Connect:** An adapter translates one system's contract into another system's preferred shape. It prevents external API/vendor quirks from spreading through your application and gives migrations a narrow seam.
**Example:** Convert `{first_name, last_name}` from an API into the frontend's `Customer { firstName, lastName }` at the boundary.
**Interview:** An adapter translates one interface or data shape into the interface your application expects, isolating external APIs, SDKs, or legacy systems from the rest of the codebase. An adapter translates one system's contract into another system's preferred shape. The key idea is: Translate at the boundary so external quirks do not leak inward.
**Remember:** Translate at the boundary so external quirks do not leak inward.

## When should you split a component?
**Answer:** Split when a piece has a distinct responsibility, independent state/behavior, meaningful reuse, or when extraction makes the parent easier to understand. Do not split purely to minimize line count.
**Connect:** Split when the component has multiple independent responsibilities, reusable sub-behavior, complex state/effects, or a performance boundary that benefits from isolation. Do not split merely because a file crossed an arbitrary line count.
**Example:** If a page component handles query parsing, data fetching, table rendering, and a complex editor, extracting domain hooks and editor/table subcomponents can clarify ownership.
**Interview:** Split when a piece has a distinct responsibility, independent state/behavior, meaningful reuse, or when extraction makes the parent easier to understand. Do not split purely to minimize line count. Split when the component has multiple independent responsibilities, reusable sub-behavior, complex state/effects, or a performance boundary that benefits from isolation.
**Remember:** Split by responsibility, not arbitrary size.
