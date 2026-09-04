---
title: "Build Tooling"
order: 14
---

## What does a bundler do?
**Answer:** A bundler follows module dependencies and produces optimized assets the browser can load, often handling transforms, code splitting, assets, and production optimizations.
**Remember:** Turn module graph into deployable browser assets.

## What is transpilation?
**Answer:** Transpilation transforms source code into equivalent code in another syntax level or dialect, such as TypeScript/modern JavaScript into browser-compatible JavaScript.
**Remember:** Source syntax changes; program meaning should stay equivalent.

## What does Babel do?
**Answer:** Babel parses and transforms JavaScript syntax through plugins and presets, commonly for language compatibility and framework transforms.
**Remember:** JavaScript syntax transformer.

## What does the TypeScript compiler do?
**Answer:** It type-checks TypeScript and can emit JavaScript by erasing types and transforming supported syntax according to configuration.
**Remember:** Check types, then emit JavaScript when configured.

## Compilation vs bundling?
**Answer:** Compilation/transpilation transforms source files. Bundling combines and optimizes a dependency graph into deliverable assets. Modern tools often perform both in one pipeline.
**Remember:** Transform code vs package module graph.

## What is HMR?
**Answer:** Hot Module Replacement updates changed modules in a running development app without requiring a full page reload, often preserving nearby state.
**Remember:** Patch changed code during development.

## What is a source map?
**Answer:** A source map maps generated code positions back to original source files so debugging and production error reporting can point to meaningful source lines.
**Remember:** Generated code → original source.

## ES Modules vs CommonJS?
**Answer:** ES Modules use static `import`/`export` syntax designed into the JavaScript language. CommonJS uses runtime `require` and `module.exports`, historically common in Node.js.
**Remember:** ESM is the standard language module system.

## Static import vs dynamic `import()`?
**Answer:** Static imports are part of the module graph up front. Dynamic `import()` returns a Promise and loads a module on demand, enabling code splitting.
**Remember:** Load now in graph vs load later on demand.

## Why is Vite fast in development?
**Answer:** Vite uses native ESM-oriented development and fast transforms, avoiding rebuilding a large application bundle for every edit. Its production build still performs bundling and optimization.
**Remember:** Serve/transform modules on demand in dev.
