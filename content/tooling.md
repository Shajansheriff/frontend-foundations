---
title: "Build Tooling"
order: 14
---
## What does a bundler do?
**Answer:** A bundler follows module dependencies and produces optimized assets the browser can load, often handling transforms, code splitting, assets, and production optimizations.
**Connect:** A bundler follows the module graph, transforms/resolves assets as needed, and emits files optimized for delivery. Modern tools may split chunks rather than literally produce one bundle; production bundling concerns differ from dev-server module serving.
**Example:** Starting from `app.tsx`, the bundler traces imported TS/CSS/images and emits browser-loadable chunks/assets.
**Interview:** A bundler follows module dependencies and produces optimized assets the browser can load, often handling transforms, code splitting, assets, and production optimizations. A bundler follows the module graph, transforms/resolves assets as needed, and emits files optimized for delivery.
**Remember:** Turn module graph into deployable browser assets.

## What is transpilation?
**Answer:** Transpilation transforms source code into equivalent code in another syntax level or dialect, such as TypeScript/modern JavaScript into browser-compatible JavaScript.
**Connect:** Transpilation converts source syntax into other source syntax at a similar abstraction level, often to support older runtimes or transform TypeScript/JSX. It is different from bundling, which organizes modules/assets for delivery.
**Example:** Convert JSX and newer JS syntax into JavaScript syntax targeted at supported browsers.
**Interview:** Transpilation transforms source code into equivalent code in another syntax level or dialect, such as TypeScript/modern JavaScript into browser-compatible JavaScript. Transpilation converts source syntax into other source syntax at a similar abstraction level, often to support older runtimes or transform TypeScript/JSX.
**Remember:** Source syntax changes; program meaning should stay equivalent.

## What does Babel do?
**Answer:** Babel parses and transforms JavaScript syntax through plugins and presets, commonly for language compatibility and framework transforms.
**Connect:** Babel parses JavaScript/JSX and applies configurable syntax transforms/plugins. It can also help inject polyfill references with the right setup, but transforming syntax does not automatically implement missing runtime APIs.
**Example:** Babel can turn optional chaining syntax into older-compatible code; a missing `Promise` API still needs runtime support/polyfill if targeting a browser without it.
**Interview:** Babel parses and transforms JavaScript syntax through plugins and presets, commonly for language compatibility and framework transforms. Babel parses JavaScript/JSX and applies configurable syntax transforms/plugins. The key idea is: JavaScript syntax transformer.
**Remember:** JavaScript syntax transformer.

## What does the TypeScript compiler do?
**Answer:** It type-checks TypeScript and can emit JavaScript by erasing types and transforming supported syntax according to configuration.
**Connect:** The TypeScript compiler type-checks TypeScript and can emit JavaScript/declarations according to configuration. Many modern build setups use TypeScript only for checking while another fast transformer/bundler emits the runtime code.
**Example:** `tsc --noEmit` can enforce type correctness while Vite/SWC/esbuild handles dev/build transforms.
**Interview:** It type-checks TypeScript and can emit JavaScript by erasing types and transforming supported syntax according to configuration. The TypeScript compiler type-checks TypeScript and can emit JavaScript/declarations according to configuration. The key idea is: Check types, then emit JavaScript when configured.
**Remember:** Check types, then emit JavaScript when configured.

## Compilation vs bundling?
**Answer:** Compilation/transpilation transforms source files. Bundling combines and optimizes a dependency graph into deliverable assets. Modern tools often perform both in one pipeline.
**Connect:** Compilation/transformation changes the representation of individual source code; bundling resolves and packages a dependency graph into deployable assets. One tool can perform both, but the concepts solve different problems.
**Example:** Turning TS into JS is compilation/transformation; combining/chunking imports into production assets is bundling.
**Interview:** Compilation/transpilation transforms source files. Bundling combines and optimizes a dependency graph into deliverable assets. Modern tools often perform both in one pipeline. Compilation/transformation changes the representation of individual source code; bundling resolves and packages a dependency graph into deployable assets.
**Remember:** Transform code vs package module graph.

## What is HMR?
**Answer:** Hot Module Replacement updates changed modules in a running development app without requiring a full page reload, often preserving nearby state.
**Connect:** Hot Module Replacement updates changed modules in a running development page without doing a full reload. Framework integrations can preserve component state when the edit is compatible, dramatically shortening the edit-feedback loop.
**Example:** Change a component's markup and see it update while keeping the current form/navigation state when Fast Refresh can preserve it.
**Interview:** Hot Module Replacement updates changed modules in a running development app without requiring a full page reload, often preserving nearby state. Hot Module Replacement updates changed modules in a running development page without doing a full reload. The key idea is: Patch changed code during development.
**Remember:** Patch changed code during development.

## What is a source map?
**Answer:** A source map maps generated code positions back to original source files so debugging and production error reporting can point to meaningful source lines.
**Connect:** A source map maps generated/minified code locations back to original source files and positions. It lets browser devtools and error monitoring show TypeScript/JSX lines even though production executes transformed bundles.
**Example:** A production stack trace at `chunk-A.js:1:9821` can be symbolicated to `checkout.tsx:87`.
**Interview:** A source map maps generated code positions back to original source files so debugging and production error reporting can point to meaningful source lines. A source map maps generated/minified code locations back to original source files and positions. The key idea is: Generated code → original source.
**Remember:** Generated code → original source.

## ES Modules vs CommonJS?
**Answer:** ES Modules use static `import`/`export` syntax designed into the JavaScript language. CommonJS uses runtime `require` and `module.exports`, historically common in Node.js.
**Connect:** ES Modules use static `import`/`export` semantics designed into the language, enabling analysis such as tree shaking; CommonJS uses runtime `require`/`module.exports` and originated in Node.js. Interop exists but can create packaging/default-export edge cases.
**Example:** Modern browser code and packages increasingly publish ESM; legacy Node packages may still expose CommonJS.
**Interview:** ES Modules use static `import`/`export` syntax designed into the JavaScript language. CommonJS uses runtime `require` and `module.exports`, historically common in Node.js. ES Modules use static `import`/`export` semantics designed into the language, enabling analysis such as tree shaking; CommonJS uses runtime `require`/`module.exports` and originated in Node.js.
**Remember:** ESM is the standard language module system.

## Static import vs dynamic `import()`?
**Answer:** Static imports are part of the module graph up front. Dynamic `import()` returns a Promise and loads a module on demand, enabling code splitting.
**Connect:** Static imports are discovered while building the module graph and load as part of the importing graph/chunk strategy. `import()` returns a Promise and creates a runtime loading boundary that bundlers can turn into code splitting.
**Example:** Dynamically import a rarely used rich-text editor when the user opens edit mode.
**Interview:** Static imports are part of the module graph up front. Dynamic `import()` returns a Promise and loads a module on demand, enabling code splitting. Static imports are discovered while building the module graph and load as part of the importing graph/chunk strategy.
**Remember:** Load now in graph vs load later on demand.

## Why is Vite fast in development?
**Answer:** Vite uses native ESM-oriented development and fast transforms, avoiding rebuilding a large application bundle for every edit. Its production build still performs bundling and optimization.
**Connect:** Vite's dev server leans on native ESM and fast transforms so it does not need to pre-bundle/rebuild the entire app graph on every source edit. It transforms requested modules on demand and uses HMR for targeted updates; production still uses a bundling pipeline.
**Example:** Starting a large app can be quick because the browser requests only modules needed for the current page instead of waiting for one giant dev bundle.
**Interview:** Vite uses native ESM-oriented development and fast transforms, avoiding rebuilding a large application bundle for every edit. Its production build still performs bundling and optimization. Vite's dev server leans on native ESM and fast transforms so it does not need to pre-bundle/rebuild the entire app graph on every source edit.
**Remember:** Serve/transform modules on demand in dev.
