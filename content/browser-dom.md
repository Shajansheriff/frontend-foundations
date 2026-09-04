---
title: "Browser & DOM"
order: 4
---

## What is the DOM?
**Answer:** The DOM is the browser’s object representation of an HTML document. JavaScript can read and modify this tree through DOM APIs.
**Remember:** HTML parsed into an object tree.

## What is the CSSOM?
**Answer:** The CSSOM is the browser’s object model representing parsed CSS rules and computed style information.
**Remember:** CSS parsed into a model the browser can use.

## What is the render tree?
**Answer:** The render tree represents the visible nodes and styles the browser needs for layout and painting. It is derived from DOM and styling information.
**Remember:** DOM + styles → what actually needs rendering.

## What is layout or reflow?
**Answer:** Layout calculates the size and position of elements. Changes affecting geometry can make the browser perform layout again.
**Remember:** Layout answers: where and how big?

## What is paint?
**Answer:** Paint turns visual properties such as text, backgrounds, borders, and shadows into drawing commands for pixels or layers.
**Remember:** Paint answers: what does it look like?

## What is compositing?
**Answer:** Compositing combines painted layers into the final frame. Some transforms and opacity changes can often be handled here without a full layout.
**Remember:** Combine layers into the screen image.

## Reflow vs repaint?
**Answer:** Reflow recalculates element geometry and can trigger painting. Repaint updates appearance without necessarily recalculating layout.
**Remember:** Geometry change is usually more expensive than visual-only change.

## What is layout thrashing?
**Answer:** Layout thrashing happens when code repeatedly mixes DOM writes and layout reads, forcing the browser to synchronously recalculate layout many times.
**Remember:** Batch reads together and writes together.

## What is the critical rendering path?
**Answer:** It is the sequence from receiving HTML and CSS to building the necessary models, calculating layout, painting, and displaying pixels.
**Remember:** Network bytes → DOM/CSSOM → layout → paint → screen.

## What is `requestAnimationFrame()`?
**Answer:** `requestAnimationFrame` asks the browser to run a callback before the next repaint, making it suitable for visual updates synchronized with frames.
**Remember:** Schedule visual work with the browser’s paint cycle.

## Why use `requestAnimationFrame` for animation instead of `setTimeout`?
**Answer:** It aligns work with browser rendering, can be throttled when not visible, and avoids timer drift relative to frames.
**Remember:** Animate per frame, not per guessed delay.

## What is event bubbling?
**Answer:** After an event reaches its target, it usually propagates upward through ancestor elements.
**Remember:** Target → parents.

## What is event capturing?
**Answer:** Capturing is the earlier propagation phase where an event travels from outer ancestors down toward the target.
**Remember:** Parents → target.

## What is event delegation?
**Answer:** Event delegation places a listener on a common ancestor and handles events from descendants using propagation. It reduces listeners and works well for dynamic lists.
**Remember:** One parent listener can serve many children.

## What is `event.target` vs `event.currentTarget`?
**Answer:** `target` is the element where the event originated. `currentTarget` is the element whose listener is currently running.
**Remember:** Origin vs listener owner.

## What does `preventDefault()` do?
**Answer:** It prevents the browser’s default action for an event, such as following a link or submitting a form, when the event is cancelable.
**Remember:** Stop browser default behavior.

## What does `stopPropagation()` do?
**Answer:** It stops the event from continuing through the propagation path. It does not automatically stop the element’s default browser action.
**Remember:** Stop propagation, not default action.

## What is a passive event listener?
**Answer:** A passive listener promises not to call `preventDefault()`. This helps the browser optimize scroll and touch handling.
**Remember:** Tell the browser scrolling will not be blocked.

## What is `DOMContentLoaded` vs `load`?
**Answer:** `DOMContentLoaded` fires after HTML is parsed and deferred scripts have run. `load` waits for dependent resources such as images to finish too.
**Remember:** DOM ready vs page resources loaded.

## What is `IntersectionObserver`?
**Answer:** It asynchronously reports when an element intersects a root or viewport. It is useful for lazy loading, visibility tracking, and infinite scroll triggers.
**Remember:** Observe visibility without manual scroll math.

## What is `ResizeObserver`?
**Answer:** It reports changes to an element’s dimensions. It is useful when UI behavior depends on a component’s own size.
**Remember:** Observe element size, not viewport size.

## What is `MutationObserver`?
**Answer:** It reports DOM tree changes such as added nodes, removed nodes, or attribute changes.
**Remember:** Observe DOM mutations.

## What is a Web Worker?
**Answer:** A Web Worker runs JavaScript in a background thread with no direct DOM access. It is useful for CPU-heavy work that would otherwise block the main thread.
**Remember:** Move computation off the UI thread.

## What is a Service Worker?
**Answer:** A Service Worker is a background browser worker that can intercept network requests and support caching, offline behavior, and push-related features.
**Remember:** Programmable network proxy for a web app.

## Web Worker vs Service Worker?
**Answer:** A Web Worker mainly offloads computation for a page. A Service Worker sits between the app and network and can outlive a page for specific browser-managed events.
**Remember:** Compute worker vs network/offline worker.
