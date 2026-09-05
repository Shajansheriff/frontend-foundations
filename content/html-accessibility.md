---
title: "HTML & Accessibility"
order: 6
---
## What is semantic HTML?
**Answer:** Semantic HTML uses elements that describe meaning and structure, such as `nav`, `main`, `article`, `button`, and `form`, instead of generic containers everywhere.
**Connect:** Semantic elements communicate meaning and relationships to browsers, assistive technology, search engines, and developers. They also often come with useful built-in behavior, so they reduce the amount of ARIA/JavaScript you need to recreate.
**Example:** Use `<nav>` for a navigation region and `<button>` for an action instead of anonymous divs with classes that merely look right.
**Interview:** Semantic HTML uses elements that describe meaning and structure, such as `nav`, `main`, `article`, `button`, and `form`, instead of generic containers everywhere. Semantic elements communicate meaning and relationships to browsers, assistive technology, search engines, and developers.
**Remember:** Choose elements by meaning, not appearance.

## Why does semantic HTML matter?
**Answer:** It improves accessibility, document structure, browser behavior, maintainability, and often SEO.
**Connect:** Semantic elements communicate meaning and relationships to browsers, assistive technology, search engines, and developers. They also often come with useful built-in behavior, so they reduce the amount of ARIA/JavaScript you need to recreate.
**Example:** Use `<nav>` for a navigation region and `<button>` for an action instead of anonymous divs with classes that merely look right.
**Interview:** It improves accessibility, document structure, browser behavior, maintainability, and often SEO. Semantic elements communicate meaning and relationships to browsers, assistive technology, search engines, and developers. The key idea is: Good semantics give useful behavior for free.
**Remember:** Good semantics give useful behavior for free.

## `div` vs `section`?
**Answer:** `div` has no semantic meaning. `section` represents a thematic section of content and usually has a heading.
**Connect:** A `div` is a neutral grouping box. A `section` represents a meaningful thematic region of the document and usually deserves a heading; using section only for styling adds semantics that do not actually exist.
**Example:** Use `<section><h2>Features</h2>...</section>` for a real content section and a `<div>` for an internal layout wrapper.
**Interview:** `div` has no semantic meaning. `section` represents a thematic section of content and usually has a heading. A `div` is a neutral grouping box. The key idea is: Generic container vs meaningful section.
**Remember:** Generic container vs meaningful section.

## `section` vs `article`?
**Answer:** `section` groups related content within a larger document. `article` represents a self-contained piece that could make sense independently.
**Connect:** A section is a thematic part of a larger whole, while an article is intended to be independently meaningful or reusable as a self-contained composition. The right choice comes from document meaning, not how the element looks.
**Example:** A news story is an `<article>`; 'Related stories' inside the page can be a `<section>`.
**Interview:** `section` groups related content within a larger document. `article` represents a self-contained piece that could make sense independently. A section is a thematic part of a larger whole, while an article is intended to be independently meaningful or reusable as a self-contained composition.
**Remember:** Part of a page vs independently meaningful content.

## Why use a `<button>` instead of a clickable `<div>`?
**Answer:** A button already has keyboard behavior, focusability, role, and interaction semantics. A div requires you to recreate all of that correctly.
**Connect:** A native button already supports keyboard activation, focus, disabled semantics, accessible role, form behavior, and expected browser interactions. Rebuilding all of that on a div is error-prone and creates accessibility debt.
**Example:** A `div onClick` is not automatically activatable with Enter/Space or exposed as a button to assistive tech; `<button>` is.
**Interview:** A button already has keyboard behavior, focusability, role, and interaction semantics. A div requires you to recreate all of that correctly. A native button already supports keyboard activation, focus, disabled semantics, accessible role, form behavior, and expected browser interactions.
**Remember:** Use native controls before recreating them.

## What does a `<label>` do for an input?
**Answer:** A label gives the control an accessible name and lets users activate/focus the associated input by interacting with the label.
**Connect:** A label gives a form control an accessible name and makes the label text itself clickable/focus-targeting for many controls. Associate it with `for`/`id` or by wrapping the control.
**Example:** Clicking `<label for='email'>Email</label>` focuses the input with `id='email'`, improving both usability and accessibility.
**Interview:** A label gives the control an accessible name and lets users activate/focus the associated input by interacting with the label. A label gives a form control an accessible name and makes the label text itself clickable/focus-targeting for many controls. The key idea is: Name + bigger interaction target.
**Remember:** Name + bigger interaction target.

## What is the purpose of `alt` text?
**Answer:** `alt` provides a text alternative for an image when the image conveys meaningful information or cannot be seen.
**Connect:** Alt text is the text alternative for meaningful image content. Write it around the image's purpose in context: what information or function would be lost if the image were unavailable, rather than listing every visual detail.
**Example:** A linked company logo may need alt text with the company/home purpose; a decorative background flourish should instead use empty alt when represented as an image.
**Interview:** `alt` provides a text alternative for an image when the image conveys meaningful information or cannot be seen. Alt text is the text alternative for meaningful image content. The key idea is: Describe the image’s purpose, not every pixel.
**Remember:** Describe the image’s purpose, not every pixel.

## When should an image use `alt=""`?
**Answer:** Use empty alt text for purely decorative images so assistive technology can ignore them.
**Connect:** An empty alt tells assistive technology the image is decorative/redundant and should usually be ignored. Omitting `alt` entirely can cause screen readers to announce filenames/URLs or treat the image differently.
**Example:** A decorative flourish beside a heading should use `alt=''` rather than repeating the heading text.
**Interview:** Use empty alt text for purely decorative images so assistive technology can ignore them. An empty alt tells assistive technology the image is decorative/redundant and should usually be ignored. The key idea is: Decorative image = no meaningful announcement.
**Remember:** Decorative image = no meaningful announcement.

## What is ARIA?
**Answer:** ARIA adds accessibility roles, states, and properties when native HTML semantics are not enough.
**Connect:** ARIA adds accessibility semantics/states/relationships when native HTML cannot express the required widget. ARIA changes the accessibility tree, not the element's keyboard behavior or visual behavior, so you must still implement interaction correctly.
**Example:** `aria-expanded` can expose whether a custom disclosure is open, but it does not make a div respond to keyboard input by itself.
**Interview:** ARIA adds accessibility roles, states, and properties when native HTML semantics are not enough. ARIA adds accessibility semantics/states/relationships when native HTML cannot express the required widget. The key idea is: ARIA supplements semantics; it does not replace good HTML.
**Remember:** ARIA supplements semantics; it does not replace good HTML.

## What is the first rule of ARIA?
**Answer:** Prefer a native HTML element with the required semantics and behavior when one exists instead of recreating it with ARIA.
**Connect:** Prefer a native HTML element with the semantics and behavior you need before adding ARIA to a generic element. Native controls have years of browser/accessibility interoperability that is difficult to reproduce correctly.
**Example:** Use `<button>` rather than `<div role='button' tabindex='0'>` unless you truly cannot use a button.
**Interview:** Prefer a native HTML element with the required semantics and behavior when one exists instead of recreating it with ARIA. Prefer a native HTML element with the semantics and behavior you need before adding ARIA to a generic element. The key idea is: Native first.
**Remember:** Native first.

## What is an accessible name?
**Answer:** It is the text assistive technology uses to identify a control or element, often coming from visible text, a label, `aria-label`, or `aria-labelledby`.
**Connect:** The accessible name is the text assistive technology uses to identify a control/element. It may come from visible text, associated labels, `aria-labelledby`, `aria-label`, alt text, and other naming rules depending on the element.
**Example:** An icon-only close button needs an accessible name such as `aria-label='Close dialog'` because there is no visible text label.
**Interview:** It is the text assistive technology uses to identify a control or element, often coming from visible text, a label, `aria-label`, or `aria-labelledby`. The accessible name is the text assistive technology uses to identify a control/element. The key idea is: What a screen reader calls the control.
**Remember:** What a screen reader calls the control.

## `aria-label` vs `aria-labelledby`?
**Answer:** `aria-label` directly provides a string name. `aria-labelledby` points to existing element(s) whose text should form the name.
**Connect:** `aria-label` directly provides a string; `aria-labelledby` points to existing element(s) whose text becomes the name. Prefer visible labels when possible because they help everyone and keep the spoken name aligned with what sighted users see.
**Example:** A dialog can use `aria-labelledby='dialog-title'` so its visible `<h2 id='dialog-title'>Delete project?</h2>` is also its accessible name.
**Interview:** `aria-label` directly provides a string name. `aria-labelledby` points to existing element(s) whose text should form the name. `aria-label` directly provides a string; `aria-labelledby` points to existing element(s) whose text becomes the name. The key idea is: Inline name vs reference visible text.
**Remember:** Inline name vs reference visible text.

## What is keyboard accessibility?
**Answer:** Interactive functionality must be operable with a keyboard, with logical focus order and visible focus indication.
**Connect:** Everything operable with a pointer should have a sensible keyboard path, visible focus, and expected key behavior. Prefer native interactive elements so Tab order and activation semantics come automatically.
**Example:** A dropdown trigger should be reachable by Tab, activatable with the expected keys, and return/manage focus predictably when it closes.
**Interview:** Interactive functionality must be operable with a keyboard, with logical focus order and visible focus indication. Everything operable with a pointer should have a sensible keyboard path, visible focus, and expected key behavior. The key idea is: If mouse-only, it is not fully accessible.
**Remember:** If mouse-only, it is not fully accessible.

## What does `tabindex="0"` do?
**Answer:** It makes an element focusable in the normal document tab order based on its DOM position.
**Connect:** `tabindex=0` puts an otherwise non-tabbable element into the document's natural sequential focus order. It can be useful for custom composite widgets or focusable regions, but it does not add button/link semantics.
**Example:** A custom scroll region may use tabindex 0 so keyboard users can focus and scroll it.
**Interview:** It makes an element focusable in the normal document tab order based on its DOM position. `tabindex=0` puts an otherwise non-tabbable element into the document's natural sequential focus order. The key idea is: Join natural tab order.
**Remember:** Join natural tab order.

## Why avoid positive `tabindex`?
**Answer:** Positive values create a custom focus order that can become confusing and difficult to maintain. DOM order should usually provide the logical order.
**Connect:** Positive values create an artificial focus ordering that can diverge from DOM/visual order and becomes extremely difficult to maintain as the page changes. Prefer DOM order plus native focusability, using 0 or -1 only when needed.
**Example:** If one control has tabindex 10 and another 2, keyboard focus follows numbers rather than intuitive document order.
**Interview:** Positive values create a custom focus order that can become confusing and difficult to maintain. DOM order should usually provide the logical order. Positive values create an artificial focus ordering that can diverge from DOM/visual order and becomes extremely difficult to maintain as the page changes.
**Remember:** Fix source order instead of forcing tab order.

## What is focus management?
**Answer:** Focus management deliberately moves or restores keyboard focus when UI context changes, such as opening or closing a modal.
**Connect:** Dynamic UI sometimes changes what should receive keyboard focus. Good focus management deliberately moves focus when context changes and returns it when appropriate, without unexpectedly stealing focus during ordinary updates.
**Example:** When opening a modal, move focus into it; when closing, normally return focus to the control that opened it.
**Interview:** Focus management deliberately moves or restores keyboard focus when UI context changes, such as opening or closing a modal. Dynamic UI sometimes changes what should receive keyboard focus. The key idea is: Keep keyboard users oriented after UI changes.
**Remember:** Keep keyboard users oriented after UI changes.

## How should a modal manage focus?
**Answer:** Move focus into the modal, keep keyboard focus within it while open, support Escape when appropriate, and restore focus to the trigger when it closes.
**Connect:** An accessible modal needs focus moved inside, keyboard focus constrained to the modal while open, Escape/close behavior where appropriate, background content made unavailable to interaction, and focus restored on close.
**Example:** After opening 'Delete project?', Tab should cycle among controls in that dialog rather than reaching page links behind it.
**Interview:** Move focus into the modal, keep keyboard focus within it while open, support Escape when appropriate, and restore focus to the trigger when it closes. An accessible modal needs focus moved inside, keyboard focus constrained to the modal while open, Escape/close behavior where appropriate, background content made unavailable to interaction, and focus restored on close.
**Remember:** Enter, contain, escape, restore.

## What is `async` vs `defer` on a classic script?
**Answer:** `async` executes as soon as the script finishes downloading and does not preserve document order. `defer` downloads in parallel but executes after parsing, in document order.
**Connect:** For classic external scripts, both allow HTML parsing to continue while downloading. `defer` executes after parsing and preserves document order; `async` executes as soon as the script is ready, so relative order is not guaranteed. Modules have their own default/defer-like behavior.
**Example:** Analytics scripts that do not depend on DOM/order can be async; application scripts with order/dependency needs often use defer or modules.
**Interview:** `async` executes as soon as the script finishes downloading and does not preserve document order. `defer` downloads in parallel but executes after parsing, in document order. For classic external scripts, both allow HTML parsing to continue while downloading. The key idea is: `async` ASAP; `defer` after parse in order.
**Remember:** `async` ASAP; `defer` after parse in order.

## What is progressive enhancement?
**Answer:** Start with a functional baseline using robust platform features, then add richer JavaScript or browser capabilities when available.
**Connect:** Start with a functional baseline using web primitives, then add richer JavaScript/CSS behavior when capabilities are available. This improves resilience, accessibility, and perceived reliability, especially across slow networks or script failures.
**Example:** A form can submit with normal HTML first; JavaScript can enhance it with inline validation and background submission.
**Interview:** Start with a functional baseline using robust platform features, then add richer JavaScript or browser capabilities when available. Start with a functional baseline using web primitives, then add richer JavaScript/CSS behavior when capabilities are available. The key idea is: Core experience first, enhancements second.
**Remember:** Core experience first, enhancements second.
