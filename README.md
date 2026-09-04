# Frontend Foundations

A small Next.js 16 study app for senior frontend interview fundamentals. The question bank lives in Markdown files under `content/`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Question bank

316 concise Q&A cards across 15 Markdown files. Answers are intentionally short and include a one-line memory hook.

## Features

- Search across questions and answers
- Filter by category and learning status
- Reveal/hide answers for active recall
- Random drill mode
- Mark questions as "Needs practice" or "Got it"
- Progress persisted in browser `localStorage`
- Markdown-backed question bank that is easy to edit

## Add a question

Open a file in `content/` and follow this format:

```md
## What is a closure?
**Answer:** A closure is a function that keeps access to variables from the scope where it was created, even after that outer scope has finished.
**Remember:** Function + remembered lexical scope.
```

The app reads all `.md` files in `content/` at build/runtime on the server.
