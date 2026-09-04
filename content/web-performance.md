---
title: "Web Performance"
order: 12
---

## What is LCP?
**Answer:** Largest Contentful Paint measures when the largest relevant content element in the viewport finishes rendering. It is a Core Web Vital for loading experience.
**Remember:** How quickly does the main visible content appear?

## What is CLS?
**Answer:** Cumulative Layout Shift measures unexpected visual movement during the page lifetime, focusing on layout stability.
**Remember:** How much does the page unexpectedly jump?

## What is INP?
**Answer:** Interaction to Next Paint measures page responsiveness across user interactions by looking at interaction latency to the next visual update.
**Remember:** How responsive does interaction feel?

## What is TTFB?
**Answer:** Time to First Byte measures how long it takes from starting a navigation/request until the first byte of the response arrives.
**Remember:** How soon does the server/network start responding?

## What is FCP?
**Answer:** First Contentful Paint measures when the first piece of DOM content such as text or an image is painted.
**Remember:** When does the user first see content?

## What is a long task?
**Answer:** A long main-thread task blocks the browser from responding to input or rendering promptly. Breaking large work into smaller chunks can improve responsiveness.
**Remember:** Main thread occupied too long.

## How do large JavaScript bundles hurt performance?
**Answer:** They require more network transfer, parsing, compilation, and execution, which can delay interactivity and consume main-thread time.
**Remember:** Bytes cost network and CPU.

## What is code splitting?
**Answer:** Code splitting creates smaller JavaScript chunks that can be loaded when a route or feature needs them instead of shipping the entire application upfront.
**Remember:** Load code closer to when it is needed.

## What is lazy loading?
**Answer:** Lazy loading defers loading a resource or module until it is needed or likely to be needed.
**Remember:** Do not pay upfront for offscreen/later work.

## What is tree shaking?
**Answer:** Tree shaking removes unused statically analyzable module exports from production bundles when the toolchain and package structure allow it.
**Remember:** Ship used code, drop unreachable exports.

## `preload` vs `prefetch`?
**Answer:** `preload` tells the browser a resource is important for the current navigation and should be fetched with higher priority. `prefetch` is a lower-priority hint for likely future use.
**Remember:** Current page important vs possible next page.

## What is a CDN?
**Answer:** A content delivery network serves content from distributed edge locations so users can fetch cacheable assets from infrastructure closer to them.
**Remember:** Bring cached content closer to users.

## Why optimize images?
**Answer:** Images are often large page resources. Correct dimensions, modern formats, responsive sources, and lazy loading can reduce bytes and improve loading metrics.
**Remember:** Do not send more pixels or bytes than needed.

## What is `srcset`?
**Answer:** `srcset` lets the browser choose among multiple image candidates based on device resolution and layout needs.
**Remember:** Give the browser image size/resolution choices.

## How do you diagnose a slow page?
**Answer:** Use real-user metrics and browser performance tools to identify whether the bottleneck is network, server response, JavaScript, rendering, images, or third-party code before changing architecture.
**Remember:** Measure the bottleneck before optimizing.

## How do you diagnose a memory leak in a web app?
**Answer:** Observe heap growth over repeated actions, compare heap snapshots, inspect retained objects, and look for unremoved listeners, timers, subscriptions, detached DOM nodes, or caches with no eviction.
**Remember:** Find what stays reachable when it should have been released.
