---
title: "Testing"
order: 13
---

## Unit vs integration vs E2E tests?
**Answer:** Unit tests isolate a small unit of logic. Integration tests verify multiple pieces working together. E2E tests exercise realistic user flows through the running application.
**Remember:** Small unit → connected pieces → full user flow.

## What should frontend tests focus on?
**Answer:** Test observable behavior and important business outcomes rather than private implementation details.
**Remember:** Test what the user or caller can observe.

## What is React Testing Library’s main philosophy?
**Answer:** Test components through the DOM in ways that resemble how users interact with them instead of testing component internals.
**Remember:** The more tests resemble usage, the more confidence they give.

## Why query elements by role?
**Answer:** Roles and accessible names reflect how users and assistive technology identify controls, so role-based queries encourage accessible and behavior-focused tests.
**Remember:** Accessible query is often the strongest user-facing query.

## Mock vs stub vs spy?
**Answer:** A stub supplies controlled behavior, a spy records calls, and a mock often combines expectations and replacement behavior. Exact terminology varies by tool.
**Remember:** Replace behavior, observe behavior, or both.

## When should you mock an API?
**Answer:** Mock when you need deterministic tests that should not depend on a real external service. Keep some higher-level tests against realistic boundaries so mocks do not become your only truth.
**Remember:** Mock for control, but validate integration somewhere.

## What is snapshot testing?
**Answer:** Snapshot testing serializes output and compares it with a stored expected snapshot on future runs.
**Remember:** Detect output change by stored representation.

## What is a downside of excessive snapshots?
**Answer:** Large snapshots are easy to update blindly and can become noisy, making it hard to tell whether an important behavior actually broke.
**Remember:** A diff is not automatically a meaningful assertion.

## What causes flaky E2E tests?
**Answer:** Common causes are timing assumptions, shared state, unstable selectors, uncontrolled network dependencies, animation, and tests that depend on execution order.
**Remember:** Flakiness usually means nondeterministic environment or synchronization.

## How do you reduce E2E flakiness?
**Answer:** Use stable user-facing selectors, wait for real conditions instead of arbitrary sleeps, isolate test data, control dependencies, and remove cross-test coupling.
**Remember:** Wait on state, not time.

## Playwright vs Cypress at a high level?
**Answer:** Both are browser testing tools. Playwright is strong for multi-browser automation and parallel isolated contexts; Cypress offers a tightly integrated browser-centric testing experience. Choose based on team needs and workflow.
**Remember:** Both solve E2E; compare capabilities and team ergonomics.

## What is the testing pyramid?
**Answer:** It suggests many fast low-level tests, fewer integration tests, and a smaller number of slower E2E tests.
**Remember:** More cheap tests, fewer expensive full-system tests.
