---
title: "Browser & DOM"
order: 4
---
## What is the DOM?
**Answer:** The DOM is the browser’s object representation of an HTML document. JavaScript can read and modify this tree through DOM APIs.
**Connect:** The DOM is the browser's object model of the document. JavaScript can read or mutate it, but DOM changes may cause later style, layout, and paint work; the DOM is not itself the pixels you see on screen.
**Example:** `document.querySelector('button')` returns a DOM object representing that element, which you can inspect or change.
**Interview:** The DOM is the browser’s object representation of an HTML document. JavaScript can read and modify this tree through DOM APIs. The DOM is the browser's object model of the document. The key idea is: HTML parsed into an object tree.
**Remember:** HTML parsed into an object tree.

## What is the CSSOM?
**Answer:** The CSSOM is the browser’s object model representing parsed CSS rules and computed style information.
**Connect:** The browser parses stylesheets into a model it can use to determine computed styles. DOM + CSSOM information feeds style calculation and the render tree, so blocking CSS can delay first rendering.
**Example:** Changing a class changes which CSS rules apply; the browser recomputes affected styles using its CSSOM.
**Interview:** The CSSOM is the browser’s object model representing parsed CSS rules and computed style information. The browser parses stylesheets into a model it can use to determine computed styles. The key idea is: CSS parsed into a model the browser can use.
**Remember:** CSS parsed into a model the browser can use.

## What is the render tree?
**Answer:** The render tree represents the visible nodes and styles the browser needs for layout and painting. It is derived from DOM and styling information.
**Connect:** The render tree represents what participates in rendering after DOM structure and computed styles are considered. Nodes that do not generate boxes, such as `display:none` content, are omitted from layout/paint work.
**Example:** An element can exist in the DOM but not produce a render-tree box while `display:none` is applied.
**Interview:** The render tree represents the visible nodes and styles the browser needs for layout and painting. It is derived from DOM and styling information. The render tree represents what participates in rendering after DOM structure and computed styles are considered.
**Remember:** DOM + styles → what actually needs rendering.

## What is layout or reflow?
**Answer:** Layout calculates the size and position of elements. Changes affecting geometry can make the browser perform layout again.
**Connect:** Layout calculates geometry: sizes and positions of boxes. Because geometry can depend on ancestors and siblings, changing one measurement can force the browser to recalculate more than one element.
**Example:** Changing an element's width can move neighboring content, so the browser may need to recalculate layout before painting.
**Interview:** Layout calculates the size and position of elements. Changes affecting geometry can make the browser perform layout again. Layout calculates geometry: sizes and positions of boxes. The key idea is: Layout answers: where and how big?.
**Remember:** Layout answers: where and how big?

## What is paint?
**Answer:** Paint turns visual properties such as text, backgrounds, borders, and shadows into drawing commands for pixels or layers.
**Connect:** Paint turns styled layout boxes into drawing commands such as text, backgrounds, borders, and shadows. A paint change does not always require geometry to change, so it can be cheaper than a layout-triggering change.
**Example:** Changing only a background color typically needs paint but not a new layout calculation.
**Interview:** Paint turns visual properties such as text, backgrounds, borders, and shadows into drawing commands for pixels or layers. Paint turns styled layout boxes into drawing commands such as text, backgrounds, borders, and shadows. The key idea is: Paint answers: what does it look like?.
**Remember:** Paint answers: what does it look like?

## What is compositing?
**Answer:** Compositing combines painted layers into the final frame. Some transforms and opacity changes can often be handled here without a full layout.
**Connect:** The browser can paint content into separate layers and then combine those layers to produce the final frame. Some animations can update layer transforms/opacity during compositing without repainting the content every frame.
**Example:** Animating `transform: translateX(...)` is often smoother than repeatedly changing `left`, because it can avoid layout and sometimes paint.
**Interview:** Compositing combines painted layers into the final frame. Some transforms and opacity changes can often be handled here without a full layout. The browser can paint content into separate layers and then combine those layers to produce the final frame. The key idea is: Combine layers into the screen image.
**Remember:** Combine layers into the screen image.

## Reflow vs repaint?
**Answer:** Reflow recalculates element geometry and can trigger painting. Repaint updates appearance without necessarily recalculating layout.
**Connect:** Layout/reflow is about geometry; repaint is about pixels. A layout change usually leads to paint for affected areas, while some visual changes can repaint without recalculating layout.
**Example:** Width change can trigger layout + paint; background-color change generally triggers paint only.
**Interview:** Reflow recalculates element geometry and can trigger painting. Repaint updates appearance without necessarily recalculating layout. Layout/reflow is about geometry; repaint is about pixels. The key idea is: Geometry change is usually more expensive than visual-only change.
**Remember:** Geometry change is usually more expensive than visual-only change.

## What is layout thrashing?
**Answer:** Layout thrashing happens when code repeatedly mixes DOM writes and layout reads, forcing the browser to synchronously recalculate layout many times.
**Connect:** Browsers batch style/layout work when they can. If JavaScript repeatedly writes a style and immediately reads a layout-dependent property, the browser may be forced to synchronously flush layout over and over.
**Example:** Avoid a loop that sets each row's width and immediately reads `offsetHeight`; batch reads first, then writes.
**Interview:** Layout thrashing happens when code repeatedly mixes DOM writes and layout reads, forcing the browser to synchronously recalculate layout many times. Browsers batch style/layout work when they can. The key idea is: Batch reads together and writes together.
**Remember:** Batch reads together and writes together.

## What is the critical rendering path?
**Answer:** It is the sequence from receiving HTML and CSS to building the necessary models, calculating layout, painting, and displaying pixels.
**Connect:** This is the dependency chain from response bytes to visible pixels: parse HTML, discover/load critical resources, build DOM/CSSOM, calculate styles/layout, then paint/composite. Optimizing it means removing work or dependencies that delay useful content.
**Example:** A large render-blocking stylesheet in the `<head>` can delay the browser from painting text even if the HTML already arrived.
**Interview:** It is the sequence from receiving HTML and CSS to building the necessary models, calculating layout, painting, and displaying pixels. This is the dependency chain from response bytes to visible pixels: parse HTML, discover/load critical resources, build DOM/CSSOM, calculate styles/layout, then paint/composite.
**Remember:** Network bytes → DOM/CSSOM → layout → paint → screen.

## What is `requestAnimationFrame()`?
**Answer:** `requestAnimationFrame` asks the browser to run a callback before the next repaint, making it suitable for visual updates synchronized with frames.
**Connect:** `requestAnimationFrame` asks the browser to run a callback before a future paint. That lets animation updates align with the display's rendering cadence and lets the browser pause/throttle work when the page is not visible.
**Example:** Read animation state, update a transform in an rAF callback, then request the next frame if the animation should continue.
**Interview:** `requestAnimationFrame` asks the browser to run a callback before the next repaint, making it suitable for visual updates synchronized with frames. `requestAnimationFrame` asks the browser to run a callback before a future paint. The key idea is: Schedule visual work with the browser’s paint cycle.
**Remember:** Schedule visual work with the browser’s paint cycle.

## Why use `requestAnimationFrame` for animation instead of `setTimeout`?
**Answer:** It aligns work with browser rendering, can be throttled when not visible, and avoids timer drift relative to frames.
**Connect:** A timer only guarantees its callback will not run *before* a threshold; it is not synchronized to paint. rAF is specifically scheduled around rendering, which avoids unnecessary frames and gives the browser better control.
**Example:** A 16 ms timeout can drift or fire at awkward times; rAF naturally targets the next visual frame.
**Interview:** It aligns work with browser rendering, can be throttled when not visible, and avoids timer drift relative to frames. A timer only guarantees its callback will not run *before* a threshold; it is not synchronized to paint. The key idea is: Animate per frame, not per guessed delay.
**Remember:** Animate per frame, not per guessed delay.

## What is event bubbling?
**Answer:** After an event reaches its target, it usually propagates upward through ancestor elements.
**Connect:** After an event reaches its target, many DOM events propagate upward through ancestors. This is why a parent can observe clicks that originated on a child, and it is the basis of event delegation.
**Example:** Click a button inside a card: the button handler can run, then the card's bubbling listener can see the same click.
**Interview:** After an event reaches its target, it usually propagates upward through ancestor elements. After an event reaches its target, many DOM events propagate upward through ancestors. The key idea is: Target → parents.
**Remember:** Target → parents.

## What is event capturing?
**Answer:** Capturing is the earlier propagation phase where an event travels from outer ancestors down toward the target.
**Connect:** Capturing is the earlier propagation phase from the outer document toward the target. Most listeners use bubbling by default, but capture is useful when an ancestor needs to observe/intercept an event before target/bubbling handlers.
**Example:** `addEventListener('click', handler, {capture:true})` runs the ancestor's capture handler on the way down.
**Interview:** Capturing is the earlier propagation phase where an event travels from outer ancestors down toward the target. Capturing is the earlier propagation phase from the outer document toward the target. The key idea is: Parents → target.
**Remember:** Parents → target.

## What is event delegation?
**Answer:** Event delegation places a listener on a common ancestor and handles events from descendants using propagation. It reduces listeners and works well for dynamic lists.
**Connect:** Delegation uses propagation to replace many child listeners with one stable ancestor listener. It works especially well for large or dynamic lists because newly added descendants are automatically covered.
**Example:** Attach one click listener to a 10,000-row table body and inspect `event.target.closest('[data-row-id]')` instead of registering 10,000 listeners.
**Interview:** Event delegation places a listener on a common ancestor and handles events from descendants using propagation. It reduces listeners and works well for dynamic lists. Delegation uses propagation to replace many child listeners with one stable ancestor listener.
**Remember:** One parent listener can serve many children.

## What is `event.target` vs `event.currentTarget`?
**Answer:** `target` is the element where the event originated. `currentTarget` is the element whose listener is currently running.
**Connect:** `target` answers 'where did the event originate?' while `currentTarget` answers 'whose listener is currently running?'. In delegated handlers they are often different, which is exactly what lets the parent determine which child was clicked.
**Example:** A button click handled by a table listener has `target` near the button and `currentTarget` equal to the table element.
**Interview:** `target` is the element where the event originated. `currentTarget` is the element whose listener is currently running. `target` answers 'where did the event originate?' while `currentTarget` answers 'whose listener is currently running?'. The key idea is: Origin vs listener owner.
**Remember:** Origin vs listener owner.

## What does `preventDefault()` do?
**Answer:** It prevents the browser’s default action for an event, such as following a link or submitting a form, when the event is cancelable.
**Connect:** Preventing the default cancels the browser action associated with an event, not propagation. Whether it has an effect depends on the event being cancelable.
**Example:** On a form `submit`, `preventDefault()` can stop the browser's normal navigation/submission so JavaScript can handle it.
**Interview:** It prevents the browser’s default action for an event, such as following a link or submitting a form, when the event is cancelable. Preventing the default cancels the browser action associated with an event, not propagation. The key idea is: Stop browser default behavior.
**Remember:** Stop browser default behavior.

## What does `stopPropagation()` do?
**Answer:** It stops the event from continuing through the propagation path. It does not automatically stop the element’s default browser action.
**Connect:** Stopping propagation prevents the event from continuing to other ancestors/descendants in the propagation path. It does not cancel the element's built-in default behavior.
**Example:** Stopping a link click from bubbling does not by itself stop navigation; `preventDefault` addresses the navigation.
**Interview:** It stops the event from continuing through the propagation path. It does not automatically stop the element’s default browser action. Stopping propagation prevents the event from continuing to other ancestors/descendants in the propagation path. The key idea is: Stop propagation, not default action.
**Remember:** Stop propagation, not default action.

## What is a passive event listener?
**Answer:** A passive listener promises not to call `preventDefault()`. This helps the browser optimize scroll and touch handling.
**Connect:** A passive listener promises it will not call `preventDefault`. For scrolling-related touch/wheel events, that lets the browser begin scrolling without waiting for JavaScript to see whether the event will be canceled.
**Example:** Use a passive scroll/touch listener when you only observe the gesture and never cancel it.
**Interview:** A passive listener promises not to call `preventDefault()`. This helps the browser optimize scroll and touch handling. A passive listener promises it will not call `preventDefault`. The key idea is: Tell the browser scrolling will not be blocked.
**Remember:** Tell the browser scrolling will not be blocked.

## What is `DOMContentLoaded` vs `load`?
**Answer:** `DOMContentLoaded` fires after HTML is parsed and deferred scripts have run. `load` waits for dependent resources such as images to finish too.
**Connect:** `DOMContentLoaded` is about document parsing; `load` waits for the page's dependent resources such as images to finish loading too. Modern modules and frameworks often make explicit use of these events unnecessary, but the distinction still matters in browser fundamentals.
**Example:** Code that only needs DOM elements can run at DOMContentLoaded; code that needs intrinsic image dimensions may wait for the image or window load.
**Interview:** `DOMContentLoaded` fires after HTML is parsed and deferred scripts have run. `load` waits for dependent resources such as images to finish too. `DOMContentLoaded` is about document parsing; `load` waits for the page's dependent resources such as images to finish loading too.
**Remember:** DOM ready vs page resources loaded.

## What is `IntersectionObserver`?
**Answer:** It asynchronously reports when an element intersects a root or viewport. It is useful for lazy loading, visibility tracking, and infinite scroll triggers.
**Connect:** IntersectionObserver lets the browser efficiently tell you when a target crosses visibility thresholds relative to a viewport/root. It avoids continuous manual scroll-position measurements.
**Example:** Lazy-load an image or trigger infinite-scroll fetching when a sentinel near the bottom becomes visible.
**Interview:** It asynchronously reports when an element intersects a root or viewport. It is useful for lazy loading, visibility tracking, and infinite scroll triggers. IntersectionObserver lets the browser efficiently tell you when a target crosses visibility thresholds relative to a viewport/root.
**Remember:** Observe visibility without manual scroll math.

## What is `ResizeObserver`?
**Answer:** It reports changes to an element’s dimensions. It is useful when UI behavior depends on a component’s own size.
**Connect:** ResizeObserver reacts to an element's size changes, which may happen without a window resize. It is useful for component-level responsive behavior or measurement-driven rendering.
**Example:** A chart can recompute its drawing dimensions when its container changes width.
**Interview:** It reports changes to an element’s dimensions. It is useful when UI behavior depends on a component’s own size. ResizeObserver reacts to an element's size changes, which may happen without a window resize. The key idea is: Observe element size, not viewport size.
**Remember:** Observe element size, not viewport size.

## What is `MutationObserver`?
**Answer:** It reports DOM tree changes such as added nodes, removed nodes, or attribute changes.
**Connect:** MutationObserver reports DOM tree/attribute/text mutations asynchronously in batches. It is useful when integrating with code that changes the DOM outside your normal component/data flow, but it should not replace ordinary application state.
**Example:** A browser extension can watch for nodes inserted by a third-party page and enhance them when they appear.
**Interview:** It reports DOM tree changes such as added nodes, removed nodes, or attribute changes. MutationObserver reports DOM tree/attribute/text mutations asynchronously in batches. The key idea is: Observe DOM mutations.
**Remember:** Observe DOM mutations.

## What is a Web Worker?
**Answer:** A Web Worker runs JavaScript in a background thread with no direct DOM access. It is useful for CPU-heavy work that would otherwise block the main thread.
**Connect:** A Web Worker runs JavaScript in another thread with its own global context and no direct DOM access. You communicate by messages, making it useful for CPU-heavy work that would otherwise block the main thread.
**Example:** Move parsing of a huge dataset into a worker, then post the processed result back to the UI thread.
**Interview:** A Web Worker runs JavaScript in a background thread with no direct DOM access. It is useful for CPU-heavy work that would otherwise block the main thread. A Web Worker runs JavaScript in another thread with its own global context and no direct DOM access. The key idea is: Move computation off the UI thread.
**Remember:** Move computation off the UI thread.

## What is a Service Worker?
**Answer:** A Service Worker is a background browser worker that can intercept network requests and support caching, offline behavior, and push-related features.
**Connect:** A Service Worker is an event-driven worker that can sit between a web app and network requests. It can implement offline caching, request strategies, push notifications, and background behavior, subject to browser lifecycle/security rules.
**Example:** A PWA can serve cached app-shell assets from a Service Worker when the network is unavailable.
**Interview:** A Service Worker is a background browser worker that can intercept network requests and support caching, offline behavior, and push-related features. A Service Worker is an event-driven worker that can sit between a web app and network requests. The key idea is: Programmable network proxy for a web app.
**Remember:** Programmable network proxy for a web app.

## Web Worker vs Service Worker?
**Answer:** A Web Worker mainly offloads computation for a page. A Service Worker sits between the app and network and can outlive a page for specific browser-managed events.
**Connect:** A Web Worker is mainly a compute thread owned by a page; a Service Worker is a browser-managed network/event proxy with a lifecycle independent of one page. Neither directly manipulates the DOM.
**Example:** Use a Web Worker for image processing; use a Service Worker for offline request caching.
**Interview:** A Web Worker mainly offloads computation for a page. A Service Worker sits between the app and network and can outlive a page for specific browser-managed events. A Web Worker is mainly a compute thread owned by a page; a Service Worker is a browser-managed network/event proxy with a lifecycle independent of one page.
**Remember:** Compute worker vs network/offline worker.
