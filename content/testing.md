---
title: "Testing"
order: 13
---
## Unit vs integration vs E2E tests?
**Answer:** Unit tests isolate a small unit of logic. Integration tests verify multiple pieces working together. E2E tests exercise realistic user flows through the running application.
**Connect:** The levels trade isolation for realism. Unit tests isolate small logic, integration tests exercise multiple pieces together, and E2E drives the application through a real browser/system boundary. A healthy suite uses the cheapest level that gives confidence for each risk.
**Example:** Pure currency formatting can be unit tested; a checkout flow across UI/API contracts deserves integration/E2E coverage.
**Interview:** Unit tests isolate a small unit of logic. Integration tests verify multiple pieces working together. E2E tests exercise realistic user flows through the running application. The levels trade isolation for realism. The key idea is: Small unit → connected pieces → full user flow.
**Remember:** Small unit → connected pieces → full user flow.

## What should frontend tests focus on?
**Answer:** Test observable behavior and important business outcomes rather than private implementation details.
**Connect:** Prefer observable behavior and domain outcomes over internal state/method calls. The closer a test resembles how a user or consumer uses the feature, the less it breaks during harmless refactors.
**Example:** Test that submitting invalid input shows an accessible error, not that a private `validate()` function was invoked once.
**Interview:** Test observable behavior and important business outcomes rather than private implementation details. Prefer observable behavior and domain outcomes over internal state/method calls. The key idea is: Test what the user or caller can observe.
**Remember:** Test what the user or caller can observe.

## What is React Testing Library’s main philosophy?
**Answer:** Test components through the DOM in ways that resemble how users interact with them instead of testing component internals.
**Connect:** React Testing Library encourages interacting with rendered UI through user-observable queries/actions rather than component internals. This makes tests more resilient and nudges markup toward accessibility.
**Example:** Find a Save button by role/name and click it instead of reaching into the component instance or querying a generated class.
**Interview:** Test components through the DOM in ways that resemble how users interact with them instead of testing component internals. React Testing Library encourages interacting with rendered UI through user-observable queries/actions rather than component internals. The key idea is: The more tests resemble usage, the more confidence they give.
**Remember:** The more tests resemble usage, the more confidence they give.

## Why query elements by role?
**Answer:** Roles and accessible names reflect how users and assistive technology identify controls, so role-based queries encourage accessible and behavior-focused tests.
**Connect:** Role/name queries mirror how assistive technology identifies controls and are usually stable across styling/refactors. When a role query fails, it can reveal that the UI itself lacks proper semantics.
**Example:** `getByRole('button', {name:/save/i})` survives a CSS class rename and verifies the element is actually exposed as a button.
**Interview:** Roles and accessible names reflect how users and assistive technology identify controls, so role-based queries encourage accessible and behavior-focused tests. Role/name queries mirror how assistive technology identifies controls and are usually stable across styling/refactors.
**Remember:** Accessible query is often the strongest user-facing query.

## Mock vs stub vs spy?
**Answer:** A stub supplies controlled behavior, a spy records calls, and a mock often combines expectations and replacement behavior. Exact terminology varies by tool.
**Connect:** Terminology varies, but the useful distinction is what the test double does: provide controlled behavior, replace a dependency, and/or record how it was called. Avoid over-specifying calls when the user-visible result gives stronger confidence.
**Example:** Stub a clock to a fixed time; spy on an analytics call only when emitting that event is itself part of the contract.
**Interview:** A stub supplies controlled behavior, a spy records calls, and a mock often combines expectations and replacement behavior. Exact terminology varies by tool. Terminology varies, but the useful distinction is what the test double does: provide controlled behavior, replace a dependency, and/or record how it was called.
**Remember:** Replace behavior, observe behavior, or both.

## When should you mock an API?
**Answer:** Mock when you need deterministic tests that should not depend on a real external service. Keep some higher-level tests against realistic boundaries so mocks do not become your only truth.
**Connect:** Mock the network when you want deterministic frontend behavior tests that do not depend on a live backend. Prefer mocking at the HTTP boundary (for example with request interception) so more of your real data-fetching code still executes.
**Example:** Return a 500 response from the mock server and verify the page's retry/error behavior.
**Interview:** Mock when you need deterministic tests that should not depend on a real external service. Keep some higher-level tests against realistic boundaries so mocks do not become your only truth. Mock the network when you want deterministic frontend behavior tests that do not depend on a live backend.
**Remember:** Mock for control, but validate integration somewhere.

## What is snapshot testing?
**Answer:** Snapshot testing serializes output and compares it with a stored expected snapshot on future runs.
**Connect:** A snapshot records serialized output and fails when that output changes. It can be useful for compact stable structures, but large UI snapshots often become approval noise where developers update them without understanding the behavior change.
**Example:** A small generated config object may suit a snapshot; a 500-line rendered page snapshot usually gives weak diagnostic value.
**Interview:** Snapshot testing serializes output and compares it with a stored expected snapshot on future runs. A snapshot records serialized output and fails when that output changes. The key idea is: Detect output change by stored representation.
**Remember:** Detect output change by stored representation.

## What is a downside of excessive snapshots?
**Answer:** Large snapshots are easy to update blindly and can become noisy, making it hard to tell whether an important behavior actually broke.
**Connect:** Large snapshots often fail for harmless markup changes and do not explain which user behavior broke. Teams can become trained to press 'update snapshot', turning the test into change detection rather than meaningful correctness verification.
**Example:** Prefer an assertion that the error message/button a user needs is present over approving hundreds of changed snapshot lines.
**Interview:** Large snapshots are easy to update blindly and can become noisy, making it hard to tell whether an important behavior actually broke. Large snapshots often fail for harmless markup changes and do not explain which user behavior broke. The key idea is: A diff is not automatically a meaningful assertion.
**Remember:** A diff is not automatically a meaningful assertion.

## What causes flaky E2E tests?
**Answer:** Common causes are timing assumptions, shared state, unstable selectors, uncontrolled network dependencies, animation, and tests that depend on execution order.
**Connect:** Flakes often come from timing races, shared state, unstable selectors, external dependencies, animation, and tests assuming implementation timing. Replace sleeps with conditions, isolate data, and wait on user-visible/network state.
**Example:** Avoid `waitForTimeout(2000)`; wait for the expected row/response to appear or for the loading state to disappear.
**Interview:** Common causes are timing assumptions, shared state, unstable selectors, uncontrolled network dependencies, animation, and tests that depend on execution order. Flakes often come from timing races, shared state, unstable selectors, external dependencies, animation, and tests assuming implementation timing.
**Remember:** Flakiness usually means nondeterministic environment or synchronization.

## How do you reduce E2E flakiness?
**Answer:** Use stable user-facing selectors, wait for real conditions instead of arbitrary sleeps, isolate test data, control dependencies, and remove cross-test coupling.
**Connect:** Make tests wait on deterministic conditions rather than elapsed time, isolate test data, use stable user-facing selectors, control external dependencies, and clean state between tests. When a test flakes, identify the race instead of hiding it with a longer sleep.
**Example:** Wait for the API response and the resulting row to appear instead of adding `waitForTimeout(3000)`.
**Interview:** Use stable user-facing selectors, wait for real conditions instead of arbitrary sleeps, isolate test data, control dependencies, and remove cross-test coupling. Make tests wait on deterministic conditions rather than elapsed time, isolate test data, use stable user-facing selectors, control external dependencies, and clean state between tests.
**Remember:** Wait on state, not time.

## Playwright vs Cypress at a high level?
**Answer:** Both are browser testing tools. Playwright is strong for multi-browser automation and parallel isolated contexts; Cypress offers a tightly integrated browser-centric testing experience. Choose based on team needs and workflow.
**Connect:** Both are browser testing tools. Playwright emphasizes multi-browser contexts, parallelism, and browser automation APIs; Cypress offers a mature interactive runner and distinct in-browser architecture. Team workflow and test requirements matter more than brand trivia.
**Example:** For cross-browser E2E with isolated contexts and multiple pages/tabs, Playwright is often a natural fit.
**Interview:** Both are browser testing tools. Playwright is strong for multi-browser automation and parallel isolated contexts; Cypress offers a tightly integrated browser-centric testing experience. Choose based on team needs and workflow. The key idea is: Both solve E2E; compare capabilities and team ergonomics.
**Remember:** Both solve E2E; compare capabilities and team ergonomics.

## What is the testing pyramid?
**Answer:** It suggests many fast low-level tests, fewer integration tests, and a smaller number of slower E2E tests.
**Connect:** The pyramid suggests many fast low-level tests, fewer integration tests, and a small number of expensive E2E tests. Treat it as a cost/feedback heuristic rather than a law; frontend teams often get strong value from more integration/component-level tests than a literal pyramid implies.
**Example:** Keep dozens of critical journey E2Es, not thousands of brittle browser tests for every tiny rendering branch.
**Interview:** It suggests many fast low-level tests, fewer integration tests, and a smaller number of slower E2E tests. The pyramid suggests many fast low-level tests, fewer integration tests, and a small number of expensive E2E tests. The key idea is: More cheap tests, fewer expensive full-system tests.
**Remember:** More cheap tests, fewer expensive full-system tests.
