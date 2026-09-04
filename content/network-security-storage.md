---
title: "Networking, Security & Storage"
order: 5
---

## What happens when you enter a URL in the browser?
**Answer:** At a high level: the browser resolves the host, establishes a connection, negotiates TLS for HTTPS, sends an HTTP request, receives resources, parses them, and renders the page.
**Remember:** DNS → connection/TLS → HTTP → parse → render.

## What is HTTP?
**Answer:** HTTP is an application-layer request/response protocol used to transfer web resources and API data.
**Remember:** Client request, server response.

## What does HTTPS add?
**Answer:** HTTPS runs HTTP over TLS, providing encryption in transit, integrity protection, and server authentication through certificates.
**Remember:** HTTP + TLS.

## GET vs POST?
**Answer:** GET is primarily for retrieving a representation and should be safe. POST submits data to be processed and may create or trigger a change.
**Remember:** GET reads; POST submits/creates/actions.

## PUT vs PATCH?
**Answer:** PUT generally replaces the target resource representation. PATCH applies a partial modification.
**Remember:** Replace vs partial update.

## What does idempotent mean?
**Answer:** An operation is idempotent when repeating the same request has the same intended effect as doing it once.
**Remember:** Retrying does not keep changing the result.

## Which common HTTP methods are idempotent?
**Answer:** GET, HEAD, OPTIONS, PUT, and DELETE are defined as idempotent in semantics. POST and PATCH are not guaranteed to be.
**Remember:** Idempotency is about effect, not identical response bytes.

## What is `200` vs `201` vs `204`?
**Answer:** `200 OK` means success with a response representation, `201 Created` means a resource was created, and `204 No Content` means success with no response body.
**Remember:** Success, created, success-no-body.

## What is `401` vs `403`?
**Answer:** `401 Unauthorized` usually means authentication is missing or invalid. `403 Forbidden` means the server understood the identity/request but refuses permission.
**Remember:** Who are you? vs you cannot do this.

## What is `304 Not Modified`?
**Answer:** It tells the client its cached copy is still valid after a conditional request, so the full representation does not need to be sent again.
**Remember:** Reuse cache; no new response body.

## What is `502` vs `503`?
**Answer:** `502 Bad Gateway` means a gateway/proxy received an invalid response from an upstream. `503 Service Unavailable` means the service is temporarily unable to handle the request.
**Remember:** Bad upstream response vs temporarily unavailable service.

## What is `Cache-Control`?
**Answer:** It is an HTTP header that defines caching rules such as freshness lifetime, revalidation, and whether responses can be stored by shared caches.
**Remember:** The main policy header for HTTP caching.

## What is an ETag?
**Answer:** An ETag is a version identifier for a response representation. Clients can send it in a conditional request so unchanged content can return `304`.
**Remember:** Fingerprint for cache revalidation.

## What is HTTP/2 multiplexing?
**Answer:** HTTP/2 can carry multiple request/response streams concurrently over one connection, reducing the need for many parallel TCP connections.
**Remember:** Many streams on one connection.

## What does HTTP/3 change?
**Answer:** HTTP/3 carries HTTP over QUIC instead of TCP. QUIC reduces connection setup cost and avoids TCP-level head-of-line blocking between independent streams.
**Remember:** HTTP over QUIC.

## REST vs GraphQL?
**Answer:** REST commonly exposes resource-oriented endpoints with server-defined response shapes. GraphQL lets clients request a typed selection of fields through a graph schema.
**Remember:** Multiple resource endpoints vs client-selected graph query.

## WebSocket vs HTTP request/response?
**Answer:** HTTP is naturally request/response. A WebSocket establishes a persistent full-duplex connection so client and server can push messages to each other.
**Remember:** Persistent two-way channel.

## WebSocket vs Server-Sent Events?
**Answer:** WebSockets are bidirectional. SSE is a simpler long-lived HTTP connection for server-to-client text events.
**Remember:** Two-way vs server-push-only.

## What is the same-origin policy?
**Answer:** It is a browser security rule that restricts scripts from freely reading resources belonging to another origin.
**Remember:** Browser isolates origins by default.

## What is CORS?
**Answer:** CORS is an HTTP-header mechanism that lets a server explicitly allow certain cross-origin browser requests that the same-origin policy would otherwise block.
**Remember:** The server grants cross-origin browser access.

## What is a CORS preflight?
**Answer:** For certain cross-origin requests, the browser first sends an `OPTIONS` request to ask whether the method and headers are allowed.
**Remember:** Ask permission before the real request.

## What is XSS?
**Answer:** Cross-site scripting happens when untrusted data is executed as script in a page. Prevent it with safe rendering/escaping, careful HTML handling, and defense-in-depth such as CSP.
**Remember:** Untrusted data becomes executable code.

## What is CSRF?
**Answer:** CSRF tricks a browser into sending an authenticated request the user did not intend, usually by abusing automatically included credentials such as cookies.
**Remember:** A malicious site causes your browser to act on another site.

## How does `SameSite` help with CSRF?
**Answer:** The cookie `SameSite` attribute limits when cookies are sent in cross-site contexts, reducing opportunities for cross-site request forgery.
**Remember:** Restrict cross-site cookie sending.

## What is an `HttpOnly` cookie?
**Answer:** An `HttpOnly` cookie is not exposed to JavaScript through `document.cookie`. This reduces token theft through injected scripts, though it does not prevent XSS itself.
**Remember:** Browser sends it; JS cannot read it.

## What does the `Secure` cookie attribute do?
**Answer:** It instructs the browser to send the cookie only over secure HTTPS connections, subject to browser rules.
**Remember:** HTTPS-only cookie transport.

## Cookies vs `localStorage`?
**Answer:** Cookies can be sent automatically with HTTP requests and support security attributes. `localStorage` is client-side string storage accessible to JavaScript and is not automatically sent with requests.
**Remember:** Cookies participate in HTTP; localStorage stays in JS storage.

## `localStorage` vs `sessionStorage`?
**Answer:** `localStorage` persists across browser sessions for an origin. `sessionStorage` is scoped to a tab/session and is cleared when that session ends.
**Remember:** Persistent origin storage vs tab-session storage.

## Why is storing auth tokens in `localStorage` debated?
**Answer:** Any JavaScript running in the origin can read `localStorage`, so successful XSS can steal the token. HttpOnly cookie designs can remove direct JavaScript access to the credential.
**Remember:** XSS can read JS-accessible storage.

## What is Content Security Policy?
**Answer:** CSP is a response policy that restricts where scripts and other resources can load from and which script execution patterns are allowed. It is a strong defense-in-depth tool against XSS.
**Remember:** Tell the browser what content is allowed to execute/load.
