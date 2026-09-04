---
title: "CSS Core"
order: 7
---

## What is the CSS box model?
**Answer:** An element is laid out as content surrounded by padding, border, and margin.
**Remember:** Content → padding → border → margin.

## What does `box-sizing: border-box` do?
**Answer:** It makes the declared width and height include padding and border, which makes sizing easier to reason about.
**Remember:** Declared size includes the visible box edges.

## Margin vs padding?
**Answer:** Margin creates space outside an element’s border. Padding creates space inside the border around the content.
**Remember:** Margin outside; padding inside.

## What is margin collapsing?
**Answer:** In normal block flow, some adjoining vertical margins combine into a single margin instead of adding together.
**Remember:** Vertical block margins can collapse.

## What is the CSS cascade?
**Answer:** The cascade is the algorithm that decides which declaration wins based on origin, importance, cascade layers, specificity, scope/proximity rules, and source order.
**Remember:** Many matching rules → one winning value.

## What is CSS specificity?
**Answer:** Specificity is the selector-weight comparison used when competing declarations have otherwise comparable cascade priority.
**Remember:** IDs generally outweigh classes; classes outweigh type selectors.

## What does `!important` do?
**Answer:** `!important` raises a declaration into the important cascade tier. It can be useful in narrow cases but overuse makes styles harder to override and reason about.
**Remember:** Changes cascade priority, not specificity itself.

## What is inheritance in CSS?
**Answer:** Some computed property values, such as color and font-related properties, naturally inherit from a parent. Many layout properties do not.
**Remember:** Some styles flow down the DOM tree.

## `display: none` vs `visibility: hidden`?
**Answer:** `display: none` removes the element from layout. `visibility: hidden` keeps its layout space but does not paint the element.
**Remember:** No layout box vs invisible box still taking space.

## `opacity: 0` vs `visibility: hidden`?
**Answer:** `opacity: 0` makes the element transparent but it still participates in layout and can still receive pointer/focus interactions depending on other settings. `visibility: hidden` hides it from painting and normal hit testing.
**Remember:** Transparent is not the same as hidden.

## What does `position: relative` do?
**Answer:** It keeps the element in normal flow but allows visual offsets, and it often establishes a containing block for absolutely positioned descendants.
**Remember:** Normal-flow anchor for absolute children.

## What does `position: absolute` do?
**Answer:** It removes the element from normal flow and positions it relative to its containing block.
**Remember:** Out of flow, positioned against a containing block.

## What does `position: fixed` do?
**Answer:** A fixed element is generally positioned relative to the viewport and does not move with normal page scrolling, though certain ancestors can change its containing block.
**Remember:** Usually pinned to viewport.

## What does `position: sticky` do?
**Answer:** Sticky positioning behaves like normal flow until a scroll threshold is reached, then the element is constrained relative to its scroll container.
**Remember:** Flow until threshold, then stick.

## What is a stacking context?
**Answer:** A stacking context is an isolated z-ordering group. Descendants are layered within their context and cannot escape it to compete directly with elements in another stacking context.
**Remember:** z-index only competes inside the relevant stacking context.

## Why can `z-index: 999999` still appear underneath something?
**Answer:** Because the element may be inside a lower stacking context. A huge child z-index cannot outrank a separate higher parent stacking context.
**Remember:** Fix the stacking context, not just the number.

## Flexbox vs Grid?
**Answer:** Flexbox is mainly one-dimensional, arranging items along a row or column. Grid is designed for two-dimensional row-and-column layout.
**Remember:** Flex = one axis; Grid = two axes.

## `justify-content` vs `align-items` in Flexbox?
**Answer:** `justify-content` distributes items along the main axis. `align-items` aligns items along the cross axis.
**Remember:** Main axis vs cross axis.

## What are `flex-grow`, `flex-shrink`, and `flex-basis`?
**Answer:** `flex-basis` is the starting main-axis size, `flex-grow` controls how extra space is shared, and `flex-shrink` controls how items reduce when space is short.
**Remember:** Basis first, then grow or shrink.

## What does `flex: 1` commonly mean?
**Answer:** In common browser behavior it expands to a flexible item that can grow and shrink with a zero basis, so siblings divide available space.
**Remember:** Share available space flexibly.

## What is the difference between `px`, `em`, and `rem`?
**Answer:** `px` is a CSS pixel unit. `em` is relative to the relevant font size context. `rem` is relative to the root element’s font size.
**Remember:** px fixed CSS unit; em local; rem root.

## What are viewport units?
**Answer:** Units such as `vw` and `vh` are relative to viewport dimensions. Modern CSS also provides dynamic/small/large viewport variants for mobile viewport behavior.
**Remember:** Size relative to the viewport.

## What are media queries?
**Answer:** Media queries conditionally apply styles based on environment characteristics such as viewport size, input capability, or user preferences.
**Remember:** Respond to the environment.

## What are container queries?
**Answer:** Container queries let a component adapt to the size or style of its containing context rather than only the viewport.
**Remember:** Responsive component, not just responsive page.

## What is mobile-first CSS?
**Answer:** Start with base styles suitable for smaller screens and progressively add enhancements for wider screens using min-width queries.
**Remember:** Base small, enhance upward.
