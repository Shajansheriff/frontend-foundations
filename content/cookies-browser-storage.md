---
title: "Cookies & Browser Storage"
order: 18
---

## What is a cookie?
**Answer:** A cookie is a small piece of data associated with a site that the browser can store and send with matching HTTP requests.
**Connect:** Cookies are tightly integrated with HTTP. Unlike `localStorage`, the browser can automatically attach cookies to requests based on domain, path, security, and SameSite rules.
**Example:** ```http
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax
```
**Interview:** Cookies are browser-managed HTTP state. They are commonly used for sessions because the browser can automatically send them with matching requests.
**Remember:** Cookie = browser-managed request state.

## How does a server create a cookie?
**Answer:** The server sends a `Set-Cookie` response header.
**Connect:** The browser decides whether to accept it and later sends matching cookies in the `Cookie` request header.
**Example:** ```http
Set-Cookie: theme=dark; Path=/; Max-Age=86400
```
**Interview:** Servers set cookies through `Set-Cookie`; browsers return eligible cookies automatically on later requests.
**Remember:** Response: `Set-Cookie`. Request: `Cookie`.

## What is a session cookie?
**Answer:** A session cookie does not have an explicit persistent lifetime such as `Expires` or `Max-Age`.
**Connect:** It is intended to last for the browser session, although exact browser session restoration behavior can vary.
**Example:** A login cookie created without `Max-Age` or `Expires` is intended to last for the browser session rather than for a fixed number of days.
**Interview:** A session cookie is browser-session scoped, while a persistent cookie has an explicit expiry.
**Remember:** No explicit expiry = session cookie.

## What is a persistent cookie?
**Answer:** A persistent cookie has an expiration time.
**Connect:** It can survive browser restarts until it expires or is removed.
**Example:** ```http
Set-Cookie: preference=compact; Max-Age=2592000
```
**Interview:** Persistent cookies use `Max-Age` or `Expires` and remain available beyond the current browser session.
**Remember:** Persistent cookie = explicit lifetime.

## What does `HttpOnly` do?
**Answer:** `HttpOnly` prevents JavaScript from reading the cookie through `document.cookie`.
**Connect:** The browser can still send the cookie with eligible HTTP requests.
**Example:** ```http
Set-Cookie: session=abc; HttpOnly
```
**Interview:** `HttpOnly` is valuable for session credentials because it reduces direct credential theft through XSS.
**Remember:** Browser can send it; JavaScript cannot read it.

## What does the `Secure` cookie attribute do?
**Answer:** `Secure` tells the browser to send the cookie only over secure HTTPS connections, subject to browser rules.
**Connect:** Session credentials should not travel over unencrypted HTTP.
**Example:** `Set-Cookie: session=abc; Secure` prevents the cookie from being sent over an ordinary `http://` connection.
**Interview:** Authentication cookies should normally use `Secure` so they are not exposed over plaintext transport.
**Remember:** Secure cookie → HTTPS transport.

## What is `SameSite` on a cookie?
**Answer:** `SameSite` controls when a cookie is sent in cross-site contexts.
**Connect:** It is an important defense against CSRF because it can prevent cookies from automatically accompanying some cross-site requests.
**Example:** A `SameSite=Lax` session cookie is withheld from many cross-site requests, reducing the chance that another site can trigger an authenticated action.
**Interview:** `SameSite` limits cross-site cookie sending and is an important layer in CSRF protection.
**Remember:** SameSite controls cross-site cookie behavior.

## `SameSite=Strict` vs `Lax` vs `None`?
**Answer:** They represent different cross-site cookie policies.
**Connect:** `Strict` is the most restrictive. `Lax` allows some top-level navigation cases while blocking many cross-site subrequests. `None` allows cross-site usage and requires `Secure`.
**Example:** A banking site may prefer `Strict`; a normal application often uses `Lax`; a cross-site embedded service may require `None; Secure`.
**Interview:** I use the most restrictive SameSite policy the product flow allows, and I only use `SameSite=None` when cross-site cookie behavior is genuinely required.
**Remember:** Strict → tightest, Lax → practical default, None → cross-site.

## What does the cookie `Domain` attribute do?
**Answer:** `Domain` controls which hosts can receive the cookie.
**Connect:** A cookie scoped to a parent domain may also be available to matching subdomains, while a host-only cookie is more narrowly scoped.
**Example:** A host-only cookie for `app.example.com` is narrower than a cookie scoped to `example.com`, which may be sent to matching subdomains.
**Interview:** I keep cookie domain scope as narrow as possible because broader domain scope exposes the cookie to more hosts.
**Remember:** Wider Domain = wider exposure.

## What does the cookie `Path` attribute do?
**Answer:** `Path` limits when the browser includes a cookie based on request path.
**Connect:** Path scoping is useful organization, but it should not be treated as a strong security boundary between applications on the same origin.
**Example:** ```http
Set-Cookie: admin_session=abc; Path=/admin
```
**Interview:** `Path` controls request matching, but I do not rely on it as an isolation mechanism against malicious same-origin code.
**Remember:** Path filters requests, not trust.

## What are `Expires` and `Max-Age`?
**Answer:** They control cookie lifetime.
**Connect:** `Max-Age` expresses lifetime in seconds. `Expires` uses a specific timestamp.
**Example:** `Max-Age=3600` keeps a cookie for roughly one hour, while `Expires=...` specifies an absolute expiry time.
**Interview:** Both can make cookies persistent; `Max-Age` is generally easier to reason about because it expresses a relative lifetime.
**Remember:** Cookie lifetime lives in `Max-Age` or `Expires`.

## How do you delete a cookie?
**Answer:** Set the same cookie with an expiry in the past or `Max-Age=0`, matching its relevant scope.
**Connect:** If the path or domain does not match the original cookie, you may accidentally create or delete a different cookie.
**Example:** ```http
Set-Cookie: session=; Max-Age=0; Path=/
```
**Interview:** Cookie deletion is really overwriting the cookie with an expired lifetime using the correct name, path, and domain.
**Remember:** Delete cookie = expire matching cookie.

## What is `document.cookie`?
**Answer:** It is the browser API for reading and writing cookies accessible to JavaScript.
**Connect:** `HttpOnly` cookies are deliberately absent from this API.
**Example:** `document.cookie` can show a JavaScript-readable preference cookie, but an `HttpOnly` session cookie will not appear there.
**Interview:** `document.cookie` only exposes cookies available to JavaScript; secure session cookies should often be `HttpOnly` and therefore invisible to it.
**Remember:** HttpOnly never appears in `document.cookie`.
```js
console.log(document.cookie);
```

## What is `localStorage`?
**Answer:** `localStorage` is synchronous key-value storage scoped to an origin.
**Connect:** Values survive page reloads and browser restarts until removed. Values are stored as strings.
**Example:** A site can persist `theme=dark` in localStorage and read it again after a reload or browser restart.
**Interview:** `localStorage` is persistent origin-scoped browser storage for small client-side data, but it is synchronous and accessible to JavaScript.
**Remember:** localStorage = persistent JS-readable storage.
```js
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");
```

## What is `sessionStorage`?
**Answer:** `sessionStorage` is key-value storage scoped to an origin and a particular top-level browsing context.
**Connect:** It survives reloads in that tab but is normally cleared when that tab or browsing context is closed.
**Example:** A checkout wizard can store the current step in sessionStorage so reloads preserve it, while closing the tab ends that tab-scoped state.
**Interview:** `sessionStorage` is similar to localStorage but is tied to a tab/session rather than being shared persistently across the origin.
**Remember:** sessionStorage = per-tab session data.
```js
sessionStorage.setItem("checkoutStep", "2");
```

## `localStorage` vs `sessionStorage`?
**Answer:** The biggest difference is lifetime and sharing.
**Connect:** `localStorage` persists and is shared across same-origin tabs. `sessionStorage` is associated with a particular browsing context.
**Example:** A theme preference can live in `localStorage`; an unfinished wizard step that should disappear when the tab closes can live in `sessionStorage`.
**Interview:** I use `localStorage` for small persistent preferences and `sessionStorage` for temporary per-tab state.
**Remember:** local = persistent/shared; session = temporary/tab-scoped.

## Cookies vs `localStorage`?
**Answer:** Cookies participate in HTTP automatically. `localStorage` does not.
**Connect:** Cookies support security attributes such as `HttpOnly`, `Secure`, and `SameSite`. `localStorage` is directly readable by page JavaScript.
**Example:** A session cookie can be automatically attached to `/api/me`; a theme stored in `localStorage` stays in the browser until JavaScript explicitly reads it.
**Interview:** For server sessions, cookies are usually a better fit because the browser manages request attachment and security attributes. `localStorage` is better suited to non-sensitive client state.
**Remember:** Cookie travels with HTTP; localStorage stays in JavaScript.

## Does the browser automatically send `localStorage` with API requests?
**Answer:** No.
**Connect:** Application JavaScript must read data from localStorage and explicitly put it into a request if needed.
**Example:** If a token is stored in localStorage, JavaScript must explicitly read it and place it in an `Authorization` header.
**Interview:** `localStorage` is not part of HTTP. Cookies can be automatically attached by the browser; localStorage values cannot.
**Remember:** localStorage never rides along automatically.
```js
const token = localStorage.getItem("token");

fetch("/api", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

## Is `localStorage` synchronous?
**Answer:** Yes.
**Connect:** Reads and writes happen on the main thread, so it is not appropriate for large amounts of data or heavy high-frequency operations.
**Example:** Reading a tiny theme flag is fine, but repeatedly serializing a large object into localStorage during scrolling can block main-thread work.
**Interview:** localStorage is convenient for small values, but because it is synchronous I avoid treating it like a general-purpose database.
**Remember:** localStorage can block the main thread.

## What types can `localStorage` store?
**Answer:** Strings.
**Connect:** Objects must usually be serialized and parsed.
**Example:** An object such as `{ compact: true }` must be `JSON.stringify`-ed before storage and `JSON.parse`-d after reading.
**Interview:** localStorage is string-based, so application data needs serialization and defensive parsing.
**Remember:** localStorage speaks strings.
```js
localStorage.setItem("userPreferences", JSON.stringify({
  compact: true
}));

const preferences = JSON.parse(
  localStorage.getItem("userPreferences") ?? "{}"
);
```

## What is the `storage` event?
**Answer:** The browser fires a `storage` event in other same-origin documents when localStorage changes.
**Connect:** It can be used to synchronize simple state such as logout or theme changes across tabs.
**Example:** When tab A changes a localStorage key, tab B on the same origin can receive a `storage` event and update its UI.
**Interview:** The storage event is useful for basic cross-tab synchronization when one tab changes localStorage.
**Remember:** One tab writes; other tabs hear.
```js
window.addEventListener("storage", (event) => {
  if (event.key === "logout") {
    // update this tab
  }
});
```

## What is `BroadcastChannel`?
**Answer:** `BroadcastChannel` lets same-origin browsing contexts exchange messages.
**Connect:** It is often cleaner than abusing localStorage changes for real-time cross-tab communication.
**Example:** Tabs on the same origin can publish a `{ type: 'LOGOUT' }` message through a shared `BroadcastChannel`.
**Interview:** I use BroadcastChannel for explicit cross-tab messaging when supported rather than treating storage as a message bus.
**Remember:** BroadcastChannel = same-origin tab messaging.
```js
const channel = new BroadcastChannel("auth");

channel.postMessage({ type: "LOGOUT" });
```

## What is IndexedDB?
**Answer:** IndexedDB is an asynchronous browser database for larger structured data.
**Connect:** Unlike localStorage, it supports larger datasets, indexes, transactions, and non-string structured values.
**Example:** Offline-first applications can cache records, drafts, or application data in IndexedDB.
**Interview:** IndexedDB is the browser's more capable client database. I use it when data size or query requirements exceed what localStorage is designed for.
**Remember:** IndexedDB = real browser database.

## IndexedDB vs `localStorage`?
**Answer:** IndexedDB is asynchronous and database-like; localStorage is synchronous and tiny key-value storage.
**Connect:** localStorage is great for a theme flag. IndexedDB is better for thousands of records or offline application data.
**Example:** Store `theme=dark` in localStorage; store thousands of offline messages or records in IndexedDB.
**Interview:** I use localStorage for a handful of simple preferences and IndexedDB for larger structured or offline datasets.
**Remember:** Preference → localStorage. Dataset → IndexedDB.

## What is the Cache Storage API?
**Answer:** Cache Storage stores HTTP request/response pairs.
**Connect:** It is commonly used with service workers for offline experiences and controlled network caching.
**Example:** A service worker can cache `/app.js` or an API `Response` so the application can reuse it offline.
**Interview:** Cache Storage is designed around HTTP responses, while IndexedDB is better for application data and localStorage for tiny preferences.
**Remember:** Cache Storage = cached HTTP responses.

## Why should sensitive application data not be stored unnecessarily in browser storage?
**Answer:** Anything persisted in the browser increases exposure.
**Connect:** XSS, shared devices, browser extensions, debugging tools, compromised devices, and overly broad code access can all make persisted data easier to reach.
**Example:** Instead of persisting a full customer profile locally, keep only the small preference the UI actually needs between visits.
**Interview:** My first storage question is whether the browser needs to persist the data at all. The safest sensitive data is often data I never store client-side.
**Remember:** Don't persist what you don't need.

## What is first-party vs third-party cookie context?
**Answer:** It describes whether the cookie's site matches the site the user is actively visiting.
**Connect:** A cookie used directly by the top-level site is first-party context. A cookie used by a different embedded or third-party site can be treated as third-party context.
**Example:** A payments iframe may operate in a different cookie context from the top-level shopping site.
**Interview:** Cookie behavior depends not only on origin but also on site context, which matters for embedded applications and cross-site authentication flows.
**Remember:** Top-level site context changes cookie behavior.

## Why can cookies behave differently inside a third-party iframe?
**Answer:** Browsers apply additional privacy restrictions to cross-site embedded contexts.
**Connect:** An iframe may not have the same cookie and storage behavior it would have when opened as a top-level page.
**Example:** A payment site may receive its cookies normally when opened directly but face partitioning or restrictions when embedded inside a shop on another site.
**Interview:** I never assume an embedded cross-site application has unrestricted cookie access. Modern browser privacy controls can partition or restrict third-party storage.
**Remember:** Embedded cross-site storage is special.

## What does `credentials: "include"` do in `fetch`?
**Answer:** It tells `fetch` to include credentials such as cookies even for cross-origin requests when browser policy and server CORS configuration allow it.
**Connect:** For cross-origin requests, credentials are not simply sent whenever JavaScript wants them. `credentials: "include"` opts into sending eligible cookies or HTTP authentication data, and the server must also return compatible CORS headers.
**Example:** A frontend on `app.example.com` can call a credentialed API with `fetch(url, { credentials: 'include' })` when the API's CORS policy explicitly allows it.
**Interview:** For cross-origin cookie authentication, the frontend may need `credentials: "include"` and the server must explicitly allow credentialed CORS requests.
**Remember:** Client and server must both agree on credentials.
```js
fetch("https://api.example.com/me", {
  credentials: "include"
});
```

## Why can't credentialed CORS normally use `Access-Control-Allow-Origin: *`?
**Answer:** Credentialed cross-origin requests require the server to explicitly identify the allowed origin rather than allowing every origin.
**Connect:** Cookies and authentication credentials are more sensitive than anonymous cross-origin reads.
**Example:** If `https://app.example` sends cookies to `https://api.example`, the API must explicitly allow `https://app.example` rather than responding with `*`.
**Interview:** When credentials are enabled, I return a specific trusted origin and `Access-Control-Allow-Credentials: true`, not a wildcard origin.
**Remember:** Credentials require an explicit origin.

## How are cookies involved in CSRF?
**Answer:** The browser may automatically attach authentication cookies to a request, even when the request was initiated from another site.
**Connect:** That automatic behavior can let an attacker trigger an authenticated action unless defenses such as SameSite, CSRF tokens, and origin checks are used.
**Example:** A malicious page submits a form to `https://bank.example/transfer`; without protections, the browser may automatically attach the victim's bank session cookie.
**Interview:** Cookie-based authentication needs CSRF protection because the browser, not application JavaScript, decides when matching cookies accompany requests.
**Remember:** Automatic cookies create CSRF risk.

## How are browser storage and XSS related?
**Answer:** XSS gives attacker-controlled JavaScript access to data available to page JavaScript.
**Connect:** That can include localStorage, sessionStorage, DOM content, in-memory data, and non-HttpOnly cookies.
**Example:** An XSS payload can read a token from localStorage because it executes with the same origin privileges as legitimate page JavaScript.
**Interview:** Any sensitive value intentionally exposed to JavaScript should be considered reachable if the page suffers XSS.
**Remember:** JS-readable storage is XSS-readable storage.

## Should React state be persisted to localStorage automatically?
**Answer:** No. Persistence is a product and data-lifecycle decision.
**Connect:** Persisting everything can create stale state, migrations, privacy problems, synchronization bugs, and unexpected behavior after releases.
**Example:** Persist a user-selected theme if it should survive reloads, but do not automatically persist transient modal state, loading flags, or cached API responses.
**Interview:** I persist only state that needs to survive reloads, version the stored shape when necessary, and treat server state separately from client preferences.
**Remember:** Not every state deserves persistence.

## What problems happen when persisted browser data changes shape after a deployment?
**Answer:** Old stored data may no longer match the new application model.
**Connect:** This can cause parsing failures, incorrect defaults, or runtime errors for returning users.
**Example:** Version 1 stores `{name}`, while version 2 expects `{displayName}`; returning users need migration or invalidation logic instead of blindly parsing the old shape.
**Interview:** I version persisted client data or provide migration and invalidation logic instead of assuming stored values always match the latest schema.
**Remember:** Persistent state needs migrations too.
