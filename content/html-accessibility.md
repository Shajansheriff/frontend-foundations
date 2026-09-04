---
title: "HTML & Accessibility"
order: 6
---

## What is semantic HTML?
**Answer:** Semantic HTML uses elements that describe meaning and structure, such as `nav`, `main`, `article`, `button`, and `form`, instead of generic containers everywhere.
**Remember:** Choose elements by meaning, not appearance.

## Why does semantic HTML matter?
**Answer:** It improves accessibility, document structure, browser behavior, maintainability, and often SEO.
**Remember:** Good semantics give useful behavior for free.

## `div` vs `section`?
**Answer:** `div` has no semantic meaning. `section` represents a thematic section of content and usually has a heading.
**Remember:** Generic container vs meaningful section.

## `section` vs `article`?
**Answer:** `section` groups related content within a larger document. `article` represents a self-contained piece that could make sense independently.
**Remember:** Part of a page vs independently meaningful content.

## Why use a `<button>` instead of a clickable `<div>`?
**Answer:** A button already has keyboard behavior, focusability, role, and interaction semantics. A div requires you to recreate all of that correctly.
**Remember:** Use native controls before recreating them.

## What does a `<label>` do for an input?
**Answer:** A label gives the control an accessible name and lets users activate/focus the associated input by interacting with the label.
**Remember:** Name + bigger interaction target.

## What is the purpose of `alt` text?
**Answer:** `alt` provides a text alternative for an image when the image conveys meaningful information or cannot be seen.
**Remember:** Describe the image’s purpose, not every pixel.

## When should an image use `alt=""`?
**Answer:** Use empty alt text for purely decorative images so assistive technology can ignore them.
**Remember:** Decorative image = no meaningful announcement.

## What is ARIA?
**Answer:** ARIA adds accessibility roles, states, and properties when native HTML semantics are not enough.
**Remember:** ARIA supplements semantics; it does not replace good HTML.

## What is the first rule of ARIA?
**Answer:** Prefer a native HTML element with the required semantics and behavior when one exists instead of recreating it with ARIA.
**Remember:** Native first.

## What is an accessible name?
**Answer:** It is the text assistive technology uses to identify a control or element, often coming from visible text, a label, `aria-label`, or `aria-labelledby`.
**Remember:** What a screen reader calls the control.

## `aria-label` vs `aria-labelledby`?
**Answer:** `aria-label` directly provides a string name. `aria-labelledby` points to existing element(s) whose text should form the name.
**Remember:** Inline name vs reference visible text.

## What is keyboard accessibility?
**Answer:** Interactive functionality must be operable with a keyboard, with logical focus order and visible focus indication.
**Remember:** If mouse-only, it is not fully accessible.

## What does `tabindex="0"` do?
**Answer:** It makes an element focusable in the normal document tab order based on its DOM position.
**Remember:** Join natural tab order.

## Why avoid positive `tabindex`?
**Answer:** Positive values create a custom focus order that can become confusing and difficult to maintain. DOM order should usually provide the logical order.
**Remember:** Fix source order instead of forcing tab order.

## What is focus management?
**Answer:** Focus management deliberately moves or restores keyboard focus when UI context changes, such as opening or closing a modal.
**Remember:** Keep keyboard users oriented after UI changes.

## How should a modal manage focus?
**Answer:** Move focus into the modal, keep keyboard focus within it while open, support Escape when appropriate, and restore focus to the trigger when it closes.
**Remember:** Enter, contain, escape, restore.

## What is `async` vs `defer` on a classic script?
**Answer:** `async` executes as soon as the script finishes downloading and does not preserve document order. `defer` downloads in parallel but executes after parsing, in document order.
**Remember:** `async` ASAP; `defer` after parse in order.

## What is progressive enhancement?
**Answer:** Start with a functional baseline using robust platform features, then add richer JavaScript or browser capabilities when available.
**Remember:** Core experience first, enhancements second.
