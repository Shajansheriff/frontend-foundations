---
title: "CSS Core"
order: 7
---
## What is the CSS box model?
**Answer:** An element is laid out as content surrounded by padding, border, and margin.
**Connect:** Every normal box can be thought of as content surrounded by padding, then border, then margin. Width/height calculations depend on `box-sizing`, which is why understanding the box model is the first step when an element is unexpectedly too large.
**Example:** With content-box, `width:100px; padding:10px; border:1px` occupies 122px before margin. With border-box, the declared 100px includes padding and border.
**Interview:** An element is laid out as content surrounded by padding, border, and margin. Every normal box can be thought of as content surrounded by padding, then border, then margin. The key idea is: Content → padding → border → margin.
**Remember:** Content → padding → border → margin.

## What does `box-sizing: border-box` do?
**Answer:** It makes the declared width and height include padding and border, which makes sizing easier to reason about.
**Connect:** `border-box` makes declared width/height describe the border box instead of only the content box. This makes component sizing more predictable because adding padding does not increase the outside width.
**Example:** A 300px card can receive 24px padding and still stay 300px wide when using border-box.
**Interview:** It makes the declared width and height include padding and border, which makes sizing easier to reason about. `border-box` makes declared width/height describe the border box instead of only the content box. The key idea is: Declared size includes the visible box edges.
**Remember:** Declared size includes the visible box edges.

## Margin vs padding?
**Answer:** Margin creates space outside an element’s border. Padding creates space inside the border around the content.
**Connect:** Padding is inside the element's border and background; margin is outside and separates the element from neighbors. Padding contributes to the clickable/background area, while margin does not.
**Example:** Increase button padding to enlarge its hit area; use margin or `gap` to create space between separate buttons.
**Interview:** Margin creates space outside an element’s border. Padding creates space inside the border around the content. Padding is inside the element's border and background; margin is outside and separates the element from neighbors. The key idea is: Margin outside; padding inside.
**Remember:** Margin outside; padding inside.

## What is margin collapsing?
**Answer:** In normal block flow, some adjoining vertical margins combine into a single margin instead of adding together.
**Connect:** Certain vertical margins of normal block-flow elements combine rather than add. This only happens in specific block formatting situations, not in Flexbox/Grid, and it is a common reason vertical spacing seems smaller or escapes a parent.
**Example:** Two adjacent block margins of 20px and 30px may produce 30px of separation, not 50px.
**Interview:** In normal block flow, some adjoining vertical margins combine into a single margin instead of adding together. Certain vertical margins of normal block-flow elements combine rather than add. The key idea is: Vertical block margins can collapse.
**Remember:** Vertical block margins can collapse.

## What is the CSS cascade?
**Answer:** The cascade is the algorithm that decides which declaration wins based on origin, importance, cascade layers, specificity, scope/proximity rules, and source order.
**Connect:** The cascade is the complete decision process for competing declarations: origin/importance, cascade layers, specificity, scope/proximity rules where applicable, and source order all participate. Specificity is only one step inside that larger process.
**Example:** A more specific selector does not automatically beat an `!important` declaration from the same relevant origin/layer rules.
**Interview:** The cascade is the algorithm that decides which declaration wins based on origin, importance, cascade layers, specificity, scope/proximity rules, and source order. The cascade is the complete decision process for competing declarations: origin/importance, cascade layers, specificity, scope/proximity rules where applicable, and source order all participate.
**Remember:** Many matching rules → one winning value.

## What is CSS specificity?
**Answer:** Specificity is the selector-weight comparison used when competing declarations have otherwise comparable cascade priority.
**Connect:** Specificity is the selector weight used when otherwise competing declarations are in the same cascade context. IDs generally outrank classes/attributes/pseudo-classes, which outrank type selectors; when weights tie, later source order wins.
**Example:** `.card.active` has more specificity than `.card`, so it wins if both rules compete under the same cascade conditions.
**Interview:** Specificity is the selector-weight comparison used when competing declarations have otherwise comparable cascade priority. Specificity is the selector weight used when otherwise competing declarations are in the same cascade context. The key idea is: IDs generally outweigh classes; classes outweigh type selectors.
**Remember:** IDs generally outweigh classes; classes outweigh type selectors.

## What does `!important` do?
**Answer:** `!important` raises a declaration into the important cascade tier. It can be useful in narrow cases but overuse makes styles harder to override and reason about.
**Connect:** `!important` changes the declaration's importance level in the cascade, making normal specificity contests irrelevant against non-important declarations. Overuse makes overrides difficult and usually signals that cascade/layer/component boundaries need improvement.
**Example:** Adding a giant selector usually cannot beat an existing important declaration; you need the cascade's importance rules, not 'more specificity'.
**Interview:** `!important` raises a declaration into the important cascade tier. It can be useful in narrow cases but overuse makes styles harder to override and reason about. `!important` changes the declaration's importance level in the cascade, making normal specificity contests irrelevant against non-important declarations.
**Remember:** Changes cascade priority, not specificity itself.

## What is inheritance in CSS?
**Answer:** Some computed property values, such as color and font-related properties, naturally inherit from a parent. Many layout properties do not.
**Connect:** Some properties, especially typography such as `color` and `font-family`, inherit from a parent when no value is specified; many layout properties do not. Inheritance is different from the cascade, which first decides the winning specified value for an element.
**Example:** A child often inherits `color` from its parent, but it does not inherit the parent's `margin`.
**Interview:** Some computed property values, such as color and font-related properties, naturally inherit from a parent. Many layout properties do not. Some properties, especially typography such as `color` and `font-family`, inherit from a parent when no value is specified; many layout properties do not.
**Remember:** Some styles flow down the DOM tree.

## `display: none` vs `visibility: hidden`?
**Answer:** `display: none` removes the element from layout. `visibility: hidden` keeps its layout space but does not paint the element.
**Connect:** `display:none` removes the element's generated box from layout; `visibility:hidden` keeps its layout space but does not paint it. Their accessibility/event behavior also differs by browser/element, so choose based on whether the layout space should remain.
**Example:** Hiding a table column with visibility can preserve geometry; `display:none` lets surrounding content close the gap.
**Interview:** `display: none` removes the element from layout. `visibility: hidden` keeps its layout space but does not paint the element. `display:none` removes the element's generated box from layout; `visibility:hidden` keeps its layout space but does not paint it. The key idea is: No layout box vs invisible box still taking space.
**Remember:** No layout box vs invisible box still taking space.

## `opacity: 0` vs `visibility: hidden`?
**Answer:** `opacity: 0` makes the element transparent but it still participates in layout and can still receive pointer/focus interactions depending on other settings. `visibility: hidden` hides it from painting and normal hit testing.
**Connect:** Opacity only changes visual transparency; the element still participates in layout and can remain interactive/focusable unless you handle that separately. `visibility:hidden` generally makes it non-visible and non-interactive while preserving space.
**Example:** An `opacity:0` button can still accidentally receive clicks, which is why opacity alone is not a complete hiding strategy.
**Interview:** `opacity: 0` makes the element transparent but it still participates in layout and can still receive pointer/focus interactions depending on other settings. `visibility: hidden` hides it from painting and normal hit testing. Opacity only changes visual transparency; the element still participates in layout and can remain interactive/focusable unless you handle that separately.
**Remember:** Transparent is not the same as hidden.

## What does `position: relative` do?
**Answer:** It keeps the element in normal flow but allows visual offsets, and it often establishes a containing block for absolutely positioned descendants.
**Connect:** A relatively positioned element stays in normal flow, but offsets can visually move it and it can establish a positioning reference for certain absolutely positioned descendants. This is why `position:relative` is often added to a card that contains an absolute badge.
**Example:** Set the card relative, then `position:absolute; top:0; right:0` on its badge to anchor the badge to the card.
**Interview:** It keeps the element in normal flow but allows visual offsets, and it often establishes a containing block for absolutely positioned descendants. A relatively positioned element stays in normal flow, but offsets can visually move it and it can establish a positioning reference for certain absolutely positioned descendants.
**Remember:** Normal-flow anchor for absolute children.

## What does `position: absolute` do?
**Answer:** It removes the element from normal flow and positions it relative to its containing block.
**Connect:** An absolutely positioned box is removed from normal flow and positioned against its containing block, often the nearest positioned ancestor. Because it no longer reserves normal-flow space, siblings behave as if that box is not occupying its old slot.
**Example:** Use absolute positioning for an overlay icon inside a relatively positioned input wrapper.
**Interview:** It removes the element from normal flow and positions it relative to its containing block. An absolutely positioned box is removed from normal flow and positioned against its containing block, often the nearest positioned ancestor. The key idea is: Out of flow, positioned against a containing block.
**Remember:** Out of flow, positioned against a containing block.

## What does `position: fixed` do?
**Answer:** A fixed element is generally positioned relative to the viewport and does not move with normal page scrolling, though certain ancestors can change its containing block.
**Connect:** Fixed positioning removes the box from normal flow and usually positions it relative to the viewport. Certain transformed/containing ancestors can change that reference, which explains some 'fixed element isn't fixed to the screen' bugs.
**Example:** A global floating action button can use `position:fixed; right:24px; bottom:24px`.
**Interview:** A fixed element is generally positioned relative to the viewport and does not move with normal page scrolling, though certain ancestors can change its containing block. Fixed positioning removes the box from normal flow and usually positions it relative to the viewport.
**Remember:** Usually pinned to viewport.

## What does `position: sticky` do?
**Answer:** Sticky positioning behaves like normal flow until a scroll threshold is reached, then the element is constrained relative to its scroll container.
**Connect:** Sticky starts like a normal-flow element and becomes constrained to an offset within its scroll container as you scroll. It needs an inset such as `top:0`, and ancestor overflow/scrolling can determine which container it sticks within.
**Example:** A table header can remain at the top of its scrolling table container with `position:sticky; top:0`.
**Interview:** Sticky positioning behaves like normal flow until a scroll threshold is reached, then the element is constrained relative to its scroll container. Sticky starts like a normal-flow element and becomes constrained to an offset within its scroll container as you scroll.
**Remember:** Flow until threshold, then stick.

## What is a stacking context?
**Answer:** A stacking context is an isolated z-ordering group. Descendants are layered within their context and cannot escape it to compete directly with elements in another stacking context.
**Connect:** A stacking context is an isolated z-order group. Descendants are compared within their own context; the entire context is then positioned as one unit relative to sibling contexts. Properties such as positioned z-index, transforms, opacity, and others can create one.
**Example:** A child with z-index 9999 cannot escape a parent stacking context that itself sits below a sibling context.
**Interview:** A stacking context is an isolated z-ordering group. Descendants are layered within their context and cannot escape it to compete directly with elements in another stacking context. A stacking context is an isolated z-order group. The key idea is: z-index only competes inside the relevant stacking context.
**Remember:** z-index only competes inside the relevant stacking context.

## Why can `z-index: 999999` still appear underneath something?
**Answer:** Because the element may be inside a lower stacking context. A huge child z-index cannot outrank a separate higher parent stacking context.
**Connect:** z-index values only compete meaningfully inside the relevant stacking context. If an ancestor created a lower stacking context, increasing the child's number does not move it above elements in a higher sibling context.
**Example:** Inspect ancestors for `transform`, `opacity < 1`, or positioned `z-index`; fix the stacking-context relationship instead of adding more 9s.
**Interview:** Because the element may be inside a lower stacking context. A huge child z-index cannot outrank a separate higher parent stacking context. z-index values only compete meaningfully inside the relevant stacking context. The key idea is: Fix the stacking context, not just the number.
**Remember:** Fix the stacking context, not just the number.

## Flexbox vs Grid?
**Answer:** Flexbox is mainly one-dimensional, arranging items along a row or column. Grid is designed for two-dimensional row-and-column layout.
**Connect:** Flexbox is primarily one-dimensional: distribute/alignment along a row *or* column, with wrapping when needed. Grid is two-dimensional: rows and columns are designed together. They complement each other and are often nested.
**Example:** Use Grid for a dashboard's column/row layout; use Flexbox inside each toolbar/card to align its controls.
**Interview:** Flexbox is mainly one-dimensional, arranging items along a row or column. Grid is designed for two-dimensional row-and-column layout. Flexbox is primarily one-dimensional: distribute/alignment along a row *or* column, with wrapping when needed. The key idea is: Flex = one axis; Grid = two axes.
**Remember:** Flex = one axis; Grid = two axes.

## `justify-content` vs `align-items` in Flexbox?
**Answer:** `justify-content` distributes items along the main axis. `align-items` aligns items along the cross axis.
**Connect:** In Flexbox, always think in terms of axes rather than horizontal/vertical. `justify-content` works along the main axis determined by `flex-direction`; `align-items` works along the cross axis.
**Example:** With `flex-direction:column`, `justify-content` becomes vertical and `align-items` becomes horizontal.
**Interview:** `justify-content` distributes items along the main axis. `align-items` aligns items along the cross axis. In Flexbox, always think in terms of axes rather than horizontal/vertical. The key idea is: Main axis vs cross axis.
**Remember:** Main axis vs cross axis.

## What are `flex-grow`, `flex-shrink`, and `flex-basis`?
**Answer:** `flex-basis` is the starting main-axis size, `flex-grow` controls how extra space is shared, and `flex-shrink` controls how items reduce when space is short.
**Connect:** Flex sizing begins from the basis, then distributes extra space using grow factors or removes insufficient space using shrink behavior. Understanding those three numbers explains why flex items sometimes ignore the width you expected.
**Example:** `flex: 1 1 0` gives siblings a zero basis and lets them grow into equal shares of remaining space.
**Interview:** `flex-basis` is the starting main-axis size, `flex-grow` controls how extra space is shared, and `flex-shrink` controls how items reduce when space is short. Flex sizing begins from the basis, then distributes extra space using grow factors or removes insufficient space using shrink behavior.
**Remember:** Basis first, then grow or shrink.

## What does `flex: 1` commonly mean?
**Answer:** In common browser behavior it expands to a flexible item that can grow and shrink with a zero basis, so siblings divide available space.
**Connect:** The shorthand is commonly interpreted by browsers as a growable, shrinkable item with a zero-ish basis (`1 1 0%`). The practical effect is that sibling `flex:1` items often split available space evenly, though intrinsic minimum sizing can still affect them.
**Example:** Three children with `flex:1` usually each receive about one third of free main-axis space.
**Interview:** In common browser behavior it expands to a flexible item that can grow and shrink with a zero basis, so siblings divide available space. The shorthand is commonly interpreted by browsers as a growable, shrinkable item with a zero-ish basis (`1 1 0%`). The key idea is: Share available space flexibly.
**Remember:** Share available space flexibly.

## What is the difference between `px`, `em`, and `rem`?
**Answer:** `px` is a CSS pixel unit. `em` is relative to the relevant font size context. `rem` is relative to the root element’s font size.
**Connect:** `px` is a CSS pixel unit; `em` is relative to the relevant element's font size (and can compound in nested typography); `rem` is relative to the root element's font size. Choose relative units when values should scale with typography/user settings.
**Example:** Use `rem` for consistent spacing tied to root scale; `em` is useful when a component's spacing should scale with its own text size.
**Interview:** `px` is a CSS pixel unit. `em` is relative to the relevant font size context. `rem` is relative to the root element’s font size. `px` is a CSS pixel unit; `em` is relative to the relevant element's font size (and can compound in nested typography); `rem` is relative to the root element's font size.
**Remember:** px fixed CSS unit; em local; rem root.

## What are viewport units?
**Answer:** Units such as `vw` and `vh` are relative to viewport dimensions. Modern CSS also provides dynamic/small/large viewport variants for mobile viewport behavior.
**Connect:** Viewport units relate dimensions to the viewport, but mobile browser UI can make the idea of viewport height dynamic. Modern units such as `dvh`, `svh`, and `lvh` address different mobile viewport behaviors.
**Example:** A full-height mobile panel often behaves better with `100dvh` than legacy `100vh` when browser chrome expands/collapses.
**Interview:** Units such as `vw` and `vh` are relative to viewport dimensions. Modern CSS also provides dynamic/small/large viewport variants for mobile viewport behavior. Viewport units relate dimensions to the viewport, but mobile browser UI can make the idea of viewport height dynamic.
**Remember:** Size relative to the viewport.

## What are media queries?
**Answer:** Media queries conditionally apply styles based on environment characteristics such as viewport size, input capability, or user preferences.
**Connect:** Media queries respond to characteristics of the viewport/device/environment, so they are appropriate for page-level responsive rules. They do not know how much space a specific reusable component actually received.
**Example:** At a narrow viewport, switch the page's two-column shell into one column.
**Interview:** Media queries conditionally apply styles based on environment characteristics such as viewport size, input capability, or user preferences. Media queries respond to characteristics of the viewport/device/environment, so they are appropriate for page-level responsive rules.
**Remember:** Respond to the environment.

## What are container queries?
**Answer:** Container queries let a component adapt to the size or style of its containing context rather than only the viewport.
**Connect:** Container queries let a component respond to the size of an ancestor container rather than the entire viewport. That makes reusable components adapt correctly when placed in different layouts.
**Example:** The same card can show horizontal details in a wide sidebar slot and stack them when its own container is narrow.
**Interview:** Container queries let a component adapt to the size or style of its containing context rather than only the viewport. Container queries let a component respond to the size of an ancestor container rather than the entire viewport. The key idea is: Responsive component, not just responsive page.
**Remember:** Responsive component, not just responsive page.

## What is mobile-first CSS?
**Answer:** Start with base styles suitable for smaller screens and progressively add enhancements for wider screens using min-width queries.
**Connect:** Mobile-first CSS starts with the simplest/narrow layout, then uses increasing-width queries to add space or complexity. It often produces fewer overrides, but the deeper principle is to organize breakpoints around content needs rather than device names.
**Example:** Write the one-column layout as the base, then add `@media (min-width: ...)` for a two-column enhancement.
**Interview:** Start with base styles suitable for smaller screens and progressively add enhancements for wider screens using min-width queries. Mobile-first CSS starts with the simplest/narrow layout, then uses increasing-width queries to add space or complexity. The key idea is: Base small, enhance upward.
**Remember:** Base small, enhance upward.
