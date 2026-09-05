# Frontend Foundations

A small Next.js study app for senior frontend interview fundamentals. The question bank lives in Markdown files under `content/`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Question bank

316 Q&A cards across 15 Markdown files. Each answer is intentionally layered so you can learn the concept first and then compress it into an interview-ready response.

Every card contains:

- **Core idea** — the precise definition
- **Connect the dots** — how the mechanism fits into the bigger frontend model
- **Example** — a concrete code/product scenario
- **Say this in an interview** — a concise answer you can practice aloud
- **Remember** — a one-line mental hook
- Small code snippets where code makes the concept easier to understand

## Features

- Search across questions and all explanation layers
- Filter by category and learning status
- Reveal/hide answers for active recall
- Random drill mode
- Mark questions as **Needs practice** or **Got it**
- Progress persisted in browser `localStorage`
- Markdown-backed question bank that is easy to edit

## Add a question

Open a file in `content/` and follow this format:

```md
## What is a closure?
**Answer:** A closure is a function that keeps access to variables from the lexical scope where it was created, even after the outer function has finished.
**Connect:** A function carries a reference to the lexical environment where it was defined. If that function escapes the scope, values it still needs remain reachable.
**Example:** `makeCounter()` can return a function that remembers its own private `count`.
**Interview:** A closure is a function that retains access to its lexical scope even after the outer function finishes. It is why callbacks can remember values from where they were created.
**Remember:** Function + remembered lexical scope.
```

The app reads all `.md` files in `content/` on the server.
