---
title: "Web Performance"
order: 12
---
## What is LCP?
**Answer:** Largest Contentful Paint measures when the largest relevant content element in the viewport finishes rendering. It is a Core Web Vital for loading experience.
**Connect:** Largest Contentful Paint measures when the largest relevant content element in the viewport is rendered, making it a proxy for how quickly the page's main content becomes visible. Improve it by finding whether the bottleneck is server response, resource discovery/download, or rendering delay.
**Example:** If the hero image is LCP, optimize its size/format, make it discoverable early, avoid lazy-loading it, and reduce blockers before it can paint.
**Interview:** Largest Contentful Paint measures when the largest relevant content element in the viewport finishes rendering. It is a Core Web Vital for loading experience. Largest Contentful Paint measures when the largest relevant content element in the viewport is rendered, making it a proxy for how quickly the page's main content becomes visible.
**Remember:** How quickly does the main visible content appear?

## What is CLS?
**Answer:** Cumulative Layout Shift measures unexpected visual movement during the page lifetime, focusing on layout stability.
**Connect:** Cumulative Layout Shift measures unexpected visual movement during the page's lifetime (grouped into session windows). Reserve space for media/ads, avoid injecting content above existing content, and use stable font/layout strategies.
**Example:** An image with no dimensions loads and pushes the article down: users perceive a layout shift and CLS increases.
**Interview:** Cumulative Layout Shift measures unexpected visual movement during the page lifetime, focusing on layout stability. Cumulative Layout Shift measures unexpected visual movement during the page's lifetime (grouped into session windows). The key idea is: How much does the page unexpectedly jump?.
**Remember:** How much does the page unexpectedly jump?

## What is INP?
**Answer:** Interaction to Next Paint measures page responsiveness across user interactions by looking at interaction latency to the next visual update.
**Connect:** Interaction to Next Paint measures responsiveness across user interactions, focusing on the latency until the browser can present the next visual update. Long main-thread JavaScript, expensive rendering, and large synchronous event handlers can worsen it.
**Example:** A click handler that synchronously processes 100,000 rows before React can paint the pressed/loading state produces poor interaction latency.
**Interview:** Interaction to Next Paint measures page responsiveness across user interactions by looking at interaction latency to the next visual update. Interaction to Next Paint measures responsiveness across user interactions, focusing on the latency until the browser can present the next visual update.
**Remember:** How responsive does interaction feel?

## What is TTFB?
**Answer:** Time to First Byte measures how long it takes from starting a navigation/request until the first byte of the response arrives.
**Connect:** TTFB measures time from navigation/request start until the first byte of the response arrives. It includes network and server-side latency, so frontend bundle optimization alone does not fix a slow TTFB.
**Example:** A distant uncached SSR endpoint with a slow database query can produce high TTFB even when the resulting HTML is tiny.
**Interview:** Time to First Byte measures how long it takes from starting a navigation/request until the first byte of the response arrives. TTFB measures time from navigation/request start until the first byte of the response arrives. The key idea is: How soon does the server/network start responding?.
**Remember:** How soon does the server/network start responding?

## What is FCP?
**Answer:** First Contentful Paint measures when the first piece of DOM content such as text or an image is painted.
**Connect:** First Contentful Paint is when the browser first paints content such as text/image/canvas from the document. It tells you when the page stops looking blank, while LCP focuses more on the main/largest content.
**Example:** Inline critical styles and remove render-blocking dependencies so heading text can paint earlier.
**Interview:** First Contentful Paint measures when the first piece of DOM content such as text or an image is painted. First Contentful Paint is when the browser first paints content such as text/image/canvas from the document. The key idea is: When does the user first see content?.
**Remember:** When does the user first see content?

## What is a long task?
**Answer:** A long main-thread task blocks the browser from responding to input or rendering promptly. Breaking large work into smaller chunks can improve responsiveness.
**Connect:** A long task is main-thread work that runs long enough to block the browser from promptly handling input or rendering (commonly observed at >50 ms in performance tooling). Breaking work into chunks or moving CPU-heavy work off-thread can improve responsiveness.
**Example:** Parsing and sorting a massive dataset synchronously for 300 ms blocks clicks and frames until that task returns.
**Interview:** A long main-thread task blocks the browser from responding to input or rendering promptly. Breaking large work into smaller chunks can improve responsiveness. A long task is main-thread work that runs long enough to block the browser from promptly handling input or rendering (commonly observed at >50 ms in performance tooling).
**Remember:** Main thread occupied too long.

## How do large JavaScript bundles hurt performance?
**Answer:** They require more network transfer, parsing, compilation, and execution, which can delay interactivity and consume main-thread time.
**Connect:** Large JS costs more than download bytes: it must also be decompressed, parsed, compiled, and executed on the main thread. On slower devices, execution cost can dominate, delaying hydration and interaction even over a fast network.
**Example:** Removing a 200 KB unused library can improve both network time and main-thread startup work.
**Interview:** They require more network transfer, parsing, compilation, and execution, which can delay interactivity and consume main-thread time. Large JS costs more than download bytes: it must also be decompressed, parsed, compiled, and executed on the main thread. The key idea is: Bytes cost network and CPU.
**Remember:** Bytes cost network and CPU.

## What is code splitting?
**Answer:** Code splitting creates smaller JavaScript chunks that can be loaded when a route or feature needs them instead of shipping the entire application upfront.
**Connect:** Code splitting creates separate chunks so users load code closer to when a route/feature is needed instead of paying for the whole app up front. Too many tiny chunks can add overhead, so split around meaningful boundaries.
**Example:** Load the admin editor bundle only when a user visits the admin route.
**Interview:** Code splitting creates smaller JavaScript chunks that can be loaded when a route or feature needs them instead of shipping the entire application upfront. Code splitting creates separate chunks so users load code closer to when a route/feature is needed instead of paying for the whole app up front.
**Remember:** Load code closer to when it is needed.

## What is lazy loading?
**Answer:** Lazy loading defers loading a resource or module until it is needed or likely to be needed.
**Connect:** Lazy loading defers a resource/component until it is likely needed, reducing initial work. Do not lazily load critical above-the-fold/LCP content, because deferral can make the important thing slower.
**Example:** Lazy-load a below-the-fold image gallery; eagerly load the hero image that defines the first screen.
**Interview:** Lazy loading defers loading a resource or module until it is needed or likely to be needed. Lazy loading defers a resource/component until it is likely needed, reducing initial work. The key idea is: Do not pay upfront for offscreen/later work.
**Remember:** Do not pay upfront for offscreen/later work.

## What is tree shaking?
**Answer:** Tree shaking removes unused statically analyzable module exports from production bundles when the toolchain and package structure allow it.
**Connect:** Tree shaking is build-time elimination of exports/code proven unused, relying heavily on static ES module structure and side-effect information. It cannot safely remove code the tool cannot prove is unused.
**Example:** Import one function from a tree-shakeable utility package and the production bundle can omit unrelated exports.
**Interview:** Tree shaking removes unused statically analyzable module exports from production bundles when the toolchain and package structure allow it. Tree shaking is build-time elimination of exports/code proven unused, relying heavily on static ES module structure and side-effect information.
**Remember:** Ship used code, drop unreachable exports.

## `preload` vs `prefetch`?
**Answer:** `preload` tells the browser a resource is important for the current navigation and should be fetched with higher priority. `prefetch` is a lower-priority hint for likely future use.
**Connect:** Preload says a resource is important for the current page and should be fetched with high priority/early discovery. Prefetch is a lower-priority hint for something likely needed in a future navigation or interaction. Misusing preload can steal bandwidth from more important resources.
**Example:** Preload the current page's critical font; prefetch code for a likely next route.
**Interview:** `preload` tells the browser a resource is important for the current navigation and should be fetched with higher priority. `prefetch` is a lower-priority hint for likely future use. Preload says a resource is important for the current page and should be fetched with high priority/early discovery.
**Remember:** Current page important vs possible next page.

## What is a CDN?
**Answer:** A content delivery network serves content from distributed edge locations so users can fetch cacheable assets from infrastructure closer to them.
**Connect:** A CDN serves/cacheable content from distributed edge locations closer to users, reducing round-trip latency and offloading origin traffic. Dynamic content can also use edge routing/caching strategies, but correctness depends on cache keys and invalidation.
**Example:** Serve fingerprinted JS/images from an edge near Chennai rather than making every request travel to a single North American origin.
**Interview:** A content delivery network serves content from distributed edge locations so users can fetch cacheable assets from infrastructure closer to them. A CDN serves/cacheable content from distributed edge locations closer to users, reducing round-trip latency and offloading origin traffic.
**Remember:** Bring cached content closer to users.

## Why optimize images?
**Answer:** Images are often large page resources. Correct dimensions, modern formats, responsive sources, and lazy loading can reduce bytes and improve loading metrics.
**Connect:** Images are often the largest page bytes and can directly affect LCP. Send the right dimensions, modern formats, responsive variants, correct compression, and appropriate eager/lazy loading instead of shipping one giant source everywhere.
**Example:** Do not send a 3000px desktop JPEG to a 360px mobile card; provide a smaller AVIF/WebP candidate.
**Interview:** Images are often large page resources. Correct dimensions, modern formats, responsive sources, and lazy loading can reduce bytes and improve loading metrics. Images are often the largest page bytes and can directly affect LCP. The key idea is: Do not send more pixels or bytes than needed.
**Remember:** Do not send more pixels or bytes than needed.

## What is `srcset`?
**Answer:** `srcset` lets the browser choose among multiple image candidates based on device resolution and layout needs.
**Connect:** `srcset` gives the browser multiple image candidates (by width or pixel density), usually paired with `sizes` so the browser can choose an appropriate resource before layout completes. This lets the browser account for viewport and device pixel density.
**Example:** A responsive card may offer 400w, 800w, and 1200w files; the browser selects the candidate that best fits its rendered size.
**Interview:** `srcset` lets the browser choose among multiple image candidates based on device resolution and layout needs. `srcset` gives the browser multiple image candidates (by width or pixel density), usually paired with `sizes` so the browser can choose an appropriate resource before layout completes.
**Remember:** Give the browser image size/resolution choices.

## How do you diagnose a slow page?
**Answer:** Use real-user metrics and browser performance tools to identify whether the bottleneck is network, server response, JavaScript, rendering, images, or third-party code before changing architecture.
**Connect:** Start by measuring rather than guessing: identify whether the problem is network/TTFB, loading/LCP, main-thread CPU, layout/paint, React rendering, or a specific interaction. Use the browser Performance/Network panels and React Profiler, then change one bottleneck and remeasure.
**Example:** If network is fast but the main thread shows a 700 ms scripting block after data arrives, caching the API response will not solve the actual problem.
**Interview:** Use real-user metrics and browser performance tools to identify whether the bottleneck is network, server response, JavaScript, rendering, images, or third-party code before changing architecture. Start by measuring rather than guessing: identify whether the problem is network/TTFB, loading/LCP, main-thread CPU, layout/paint, React rendering, or a specific interaction.
**Remember:** Measure the bottleneck before optimizing.

## How do you diagnose a memory leak in a web app?
**Answer:** Observe heap growth over repeated actions, compare heap snapshots, inspect retained objects, and look for unremoved listeners, timers, subscriptions, detached DOM nodes, or caches with no eviction.
**Connect:** A leak means objects remain reachable even though the application no longer needs them. Look for steadily growing heap usage and retained paths involving event listeners, timers, subscriptions, caches, detached DOM nodes, or closures; compare heap snapshots around repeated workflows.
**Example:** Open/close a screen 50 times; if detached nodes and listeners accumulate after GC, inspect what still references them.
**Interview:** Observe heap growth over repeated actions, compare heap snapshots, inspect retained objects, and look for unremoved listeners, timers, subscriptions, detached DOM nodes, or caches with no eviction. A leak means objects remain reachable even though the application no longer needs them.
**Remember:** Find what stays reachable when it should have been released.
