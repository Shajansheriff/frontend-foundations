---
title: "Networking, Security & Storage"
order: 5
---
## What happens when you enter a URL in the browser?
**Answer:** At a high level: the browser resolves the host, establishes a connection, negotiates TLS for HTTPS, sends an HTTP request, receives resources, parses them, and renders the page.
**Connect:** Conceptually the browser resolves the host (often DNS/cache), establishes a connection (TCP+TLS for HTTPS or QUIC for HTTP/3), sends an HTTP request, receives a response, then parses/render resources while discovering additional dependencies. Caches, service workers, redirects, CDNs, and connection reuse can alter individual steps.
**Example:** For `https://example.com`, the browser needs an IP/connection before it can exchange the HTTP request and start receiving HTML.
**Interview:** At a high level: the browser resolves the host, establishes a connection, negotiates TLS for HTTPS, sends an HTTP request, receives resources, parses them, and renders the page. Conceptually the browser resolves the host (often DNS/cache), establishes a connection (TCP+TLS for HTTPS or QUIC for HTTP/3), sends an HTTP request, receives a response, then parses/render resources while discovering additional dependencies.
**Remember:** DNS → connection/TLS → HTTP → parse → render.

## What is HTTP?
**Answer:** HTTP is an application-layer request/response protocol used to transfer web resources and API data.
**Connect:** HTTP is an application-layer request/response protocol: a client sends a method, target, headers, and optional body; a server returns a status, headers, and optional body. It defines semantics, while lower networking layers carry the bytes.
**Example:** A browser sends `GET /products`; the server might answer `200` with JSON or HTML plus caching headers.
**Interview:** HTTP is an application-layer request/response protocol used to transfer web resources and API data. HTTP is an application-layer request/response protocol: a client sends a method, target, headers, and optional body; a server returns a status, headers, and optional body.
**Remember:** Client request, server response.

## What does HTTPS add?
**Answer:** HTTPS runs HTTP over TLS, providing encryption in transit, integrity protection, and server authentication through certificates.
**Connect:** HTTPS is HTTP carried over a secure transport (TLS, or TLS integrated with QUIC for HTTP/3). It provides encryption in transit, integrity against tampering, and server authentication through certificates, but it does not make the application itself free of security bugs.
**Example:** HTTPS stops a network observer from reading a login password in transit, but it does not prevent an XSS bug in the page.
**Interview:** HTTPS runs HTTP over TLS, providing encryption in transit, integrity protection, and server authentication through certificates. HTTPS is HTTP carried over a secure transport (TLS, or TLS integrated with QUIC for HTTP/3). The key idea is: HTTP + TLS.
**Remember:** HTTP + TLS.

## GET vs POST?
**Answer:** GET is primarily for retrieving a representation and should be safe. POST submits data to be processed and may create or trigger a change.
**Connect:** GET is intended to retrieve a representation without changing server state as its purpose; POST submits data to create/process/change something according to the endpoint semantics. GETs are cacheable/bookmarkable in ways POSTs usually are not, and sensitive data should not be placed in query URLs casually.
**Example:** Use GET to fetch `/users/42`; use POST to create a new order or submit an action.
**Interview:** GET is primarily for retrieving a representation and should be safe. POST submits data to be processed and may create or trigger a change. GET is intended to retrieve a representation without changing server state as its purpose; POST submits data to create/process/change something according to the endpoint semantics.
**Remember:** GET reads; POST submits/creates/actions.

## PUT vs PATCH?
**Answer:** PUT generally replaces the target resource representation. PATCH applies a partial modification.
**Connect:** PUT conventionally replaces the target resource representation (and is idempotent), while PATCH applies a partial modification described by the request. Actual API contracts still define the exact semantics, so do not infer behavior solely from the verb.
**Example:** Changing only `displayName` fits PATCH; sending the complete desired user representation can fit PUT.
**Interview:** PUT generally replaces the target resource representation. PATCH applies a partial modification. PUT conventionally replaces the target resource representation (and is idempotent), while PATCH applies a partial modification described by the request. The key idea is: Replace vs partial update.
**Remember:** Replace vs partial update.

## What does idempotent mean?
**Answer:** An operation is idempotent when repeating the same request has the same intended effect as doing it once.
**Connect:** Idempotent means repeating the same operation has the same intended server-side effect as performing it once. It does not mean the response bytes must be identical or that nothing is written internally.
**Example:** Sending the same `PUT /profile` twice should leave the profile in the same final state as sending it once.
**Interview:** An operation is idempotent when repeating the same request has the same intended effect as doing it once. Idempotent means repeating the same operation has the same intended server-side effect as performing it once. The key idea is: Retrying does not keep changing the result.
**Remember:** Retrying does not keep changing the result.

## Which common HTTP methods are idempotent?
**Answer:** GET, HEAD, OPTIONS, PUT, and DELETE are defined as idempotent in semantics. POST and PATCH are not guaranteed to be.
**Connect:** GET, HEAD, PUT, DELETE, OPTIONS, and TRACE are defined as idempotent in HTTP semantics; POST and PATCH are not inherently so. APIs can also add application-level idempotency keys to make particular POST operations safely retryable.
**Example:** Payment creation often uses a POST plus an idempotency key so a network retry does not create two charges.
**Interview:** GET, HEAD, OPTIONS, PUT, and DELETE are defined as idempotent in semantics. POST and PATCH are not guaranteed to be. GET, HEAD, PUT, DELETE, OPTIONS, and TRACE are defined as idempotent in HTTP semantics; POST and PATCH are not inherently so. The key idea is: Idempotency is about effect, not identical response bytes.
**Remember:** Idempotency is about effect, not identical response bytes.

## What is `200` vs `201` vs `204`?
**Answer:** `200 OK` means success with a response representation, `201 Created` means a resource was created, and `204 No Content` means success with no response body.
**Connect:** They all indicate success but communicate different response semantics. 200 is general success with a representation, 201 signals a resource was created (often with a Location), and 204 means success with no response body.
**Example:** Create a user → 201; update and return the user → 200; successful delete with no body → 204.
**Interview:** `200 OK` means success with a response representation, `201 Created` means a resource was created, and `204 No Content` means success with no response body. They all indicate success but communicate different response semantics. The key idea is: Success, created, success-no-body.
**Remember:** Success, created, success-no-body.

## What is `401` vs `403`?
**Answer:** `401 Unauthorized` usually means authentication is missing or invalid. `403 Forbidden` means the server understood the identity/request but refuses permission.
**Connect:** 401 means the request lacks acceptable authentication credentials (despite the historical wording 'Unauthorized'); 403 means the server understood who/what is requesting but refuses authorization for that resource/action.
**Example:** Expired login token → 401; logged-in user trying an admin-only action → 403.
**Interview:** `401 Unauthorized` usually means authentication is missing or invalid. `403 Forbidden` means the server understood the identity/request but refuses permission. 401 means the request lacks acceptable authentication credentials (despite the historical wording 'Unauthorized'); 403 means the server understood who/what is requesting but refuses authorization for that resource/action.
**Remember:** Who are you? vs you cannot do this.

## What is `304 Not Modified`?
**Answer:** It tells the client its cached copy is still valid after a conditional request, so the full representation does not need to be sent again.
**Connect:** A 304 is part of conditional caching. The client sends a validator such as `If-None-Match`; if the representation is unchanged, the server tells the client to reuse its cached body instead of sending it again.
**Example:** Browser sends an ETag validator for a JS file; server returns 304 and no new file body when it is unchanged.
**Interview:** It tells the client its cached copy is still valid after a conditional request, so the full representation does not need to be sent again. A 304 is part of conditional caching. The key idea is: Reuse cache; no new response body.
**Remember:** Reuse cache; no new response body.

## What is `502` vs `503`?
**Answer:** `502 Bad Gateway` means a gateway/proxy received an invalid response from an upstream. `503 Service Unavailable` means the service is temporarily unable to handle the request.
**Connect:** 502 Bad Gateway usually means a gateway/proxy received an invalid/failing response from an upstream service. 503 Service Unavailable means the server is temporarily unable to handle the request, often due to overload or maintenance.
**Example:** A reverse proxy cannot reach a healthy response from the app → 502; the service intentionally sheds traffic during overload → 503.
**Interview:** `502 Bad Gateway` means a gateway/proxy received an invalid response from an upstream. `503 Service Unavailable` means the service is temporarily unable to handle the request. 502 Bad Gateway usually means a gateway/proxy received an invalid/failing response from an upstream service.
**Remember:** Bad upstream response vs temporarily unavailable service.

## What is `Cache-Control`?
**Answer:** It is an HTTP header that defines caching rules such as freshness lifetime, revalidation, and whether responses can be stored by shared caches.
**Connect:** `Cache-Control` carries caching directives such as freshness (`max-age`), revalidation requirements, privacy (`private`), and whether storage is allowed (`no-store`). Correct caching is about both performance and data correctness/privacy.
**Example:** A fingerprinted JS asset can have a long immutable cache lifetime; a personalized account response may need private/no-store rules.
**Interview:** It is an HTTP header that defines caching rules such as freshness lifetime, revalidation, and whether responses can be stored by shared caches. `Cache-Control` carries caching directives such as freshness (`max-age`), revalidation requirements, privacy (`private`), and whether storage is allowed (`no-store`).
**Remember:** The main policy header for HTTP caching.

## What is an ETag?
**Answer:** An ETag is a version identifier for a response representation. Clients can send it in a conditional request so unchanged content can return `304`.
**Connect:** An ETag is an opaque validator representing a version of a resource. The client can send it back in conditional requests so the server can answer 304 when the cached representation is still current.
**Example:** Response: `ETag: "abc"`; later request: `If-None-Match: "abc"`.
**Interview:** An ETag is a version identifier for a response representation. Clients can send it in a conditional request so unchanged content can return `304`. An ETag is an opaque validator representing a version of a resource. The key idea is: Fingerprint for cache revalidation.
**Remember:** Fingerprint for cache revalidation.

## What is HTTP/2 multiplexing?
**Answer:** HTTP/2 can carry multiple request/response streams concurrently over one connection, reducing the need for many parallel TCP connections.
**Connect:** HTTP/2 can carry multiple request/response streams concurrently over one connection instead of needing one connection per in-flight request. This reduces connection overhead and avoids HTTP/1.1's per-connection request serialization, though TCP-level loss can still affect the connection.
**Example:** A page can request many JS/CSS/image resources over one HTTP/2 connection with interleaved frames.
**Interview:** HTTP/2 can carry multiple request/response streams concurrently over one connection, reducing the need for many parallel TCP connections. HTTP/2 can carry multiple request/response streams concurrently over one connection instead of needing one connection per in-flight request.
**Remember:** Many streams on one connection.

## What does HTTP/3 change?
**Answer:** HTTP/3 carries HTTP over QUIC instead of TCP. QUIC reduces connection setup cost and avoids TCP-level head-of-line blocking between independent streams.
**Connect:** HTTP/3 runs HTTP semantics over QUIC/UDP rather than TCP. QUIC provides independent streams so packet loss on one stream does not impose TCP's connection-wide head-of-line blocking, and it improves connection establishment/migration behavior.
**Example:** Losing a packet for one image stream need not stall unrelated response streams at the transport level in the same way as HTTP/2 over one TCP connection.
**Interview:** HTTP/3 carries HTTP over QUIC instead of TCP. QUIC reduces connection setup cost and avoids TCP-level head-of-line blocking between independent streams. HTTP/3 runs HTTP semantics over QUIC/UDP rather than TCP.
**Remember:** HTTP over QUIC.

## REST vs GraphQL?
**Answer:** REST commonly exposes resource-oriented endpoints with server-defined response shapes. GraphQL lets clients request a typed selection of fields through a graph schema.
**Connect:** REST commonly exposes resource-oriented endpoints using HTTP semantics; GraphQL exposes a typed query language where clients request fields through a graph schema. GraphQL can reduce over/under-fetching for complex screens, but introduces schema, caching, authorization, and query-cost considerations.
**Example:** A dashboard may fetch several related shapes in one GraphQL query; a simple CRUD API can remain clearer as REST endpoints.
**Interview:** REST commonly exposes resource-oriented endpoints with server-defined response shapes. GraphQL lets clients request a typed selection of fields through a graph schema. REST commonly exposes resource-oriented endpoints using HTTP semantics; GraphQL exposes a typed query language where clients request fields through a graph schema.
**Remember:** Multiple resource endpoints vs client-selected graph query.

## WebSocket vs HTTP request/response?
**Answer:** HTTP is naturally request/response. A WebSocket establishes a persistent full-duplex connection so client and server can push messages to each other.
**Connect:** Normal HTTP request/response is client-initiated and finite. A WebSocket upgrades to a long-lived full-duplex connection so either side can send messages at any time, which is useful for interactive real-time systems but adds connection/state infrastructure.
**Example:** Collaborative editing or a live multiplayer cursor feed can use WebSockets; fetching a profile should remain ordinary HTTP.
**Interview:** HTTP is naturally request/response. A WebSocket establishes a persistent full-duplex connection so client and server can push messages to each other. Normal HTTP request/response is client-initiated and finite. The key idea is: Persistent two-way channel.
**Remember:** Persistent two-way channel.

## WebSocket vs Server-Sent Events?
**Answer:** WebSockets are bidirectional. SSE is a simpler long-lived HTTP connection for server-to-client text events.
**Connect:** SSE keeps a long-lived HTTP connection for server-to-client text events and has built-in reconnection semantics; WebSocket is bidirectional and more general. Choose SSE when the client mostly listens and WebSocket when both sides need frequent messages.
**Example:** Live job-status updates can use SSE; chat where clients continuously send and receive messages often fits WebSocket.
**Interview:** WebSockets are bidirectional. SSE is a simpler long-lived HTTP connection for server-to-client text events. SSE keeps a long-lived HTTP connection for server-to-client text events and has built-in reconnection semantics; WebSocket is bidirectional and more general.
**Remember:** Two-way vs server-push-only.

## What is the same-origin policy?
**Answer:** It is a browser security rule that restricts scripts from freely reading resources belonging to another origin.
**Connect:** The same-origin policy is a browser security boundary that limits how documents/scripts from one origin can access resources from another. Origin is based on scheme, host, and port; mechanisms such as CORS deliberately relax certain cross-origin network reads.
**Example:** JavaScript on `https://a.com` cannot freely read responses/data from `https://b.com` just because it can send a network request there.
**Interview:** It is a browser security rule that restricts scripts from freely reading resources belonging to another origin. The same-origin policy is a browser security boundary that limits how documents/scripts from one origin can access resources from another. The key idea is: Browser isolates origins by default.
**Remember:** Browser isolates origins by default.

## What is CORS?
**Answer:** CORS is an HTTP-header mechanism that lets a server explicitly allow certain cross-origin browser requests that the same-origin policy would otherwise block.
**Connect:** CORS is an HTTP-header protocol where a server tells the browser which cross-origin frontend origins/methods/headers may read its responses. It is enforced by browsers; it is not authentication and does not stop non-browser clients from calling an API.
**Example:** The API can answer with `Access-Control-Allow-Origin: https://app.example.com` to allow that web origin to read the response.
**Interview:** CORS is an HTTP-header mechanism that lets a server explicitly allow certain cross-origin browser requests that the same-origin policy would otherwise block. CORS is an HTTP-header protocol where a server tells the browser which cross-origin frontend origins/methods/headers may read its responses.
**Remember:** The server grants cross-origin browser access.

## What is a CORS preflight?
**Answer:** For certain cross-origin requests, the browser first sends an `OPTIONS` request to ask whether the method and headers are allowed.
**Connect:** For certain non-simple cross-origin requests, the browser first sends an OPTIONS request asking whether the actual method/headers are allowed. Only after an acceptable preflight response does the browser send the intended request.
**Example:** A cross-origin `PATCH` with `Authorization` commonly triggers a preflight before the PATCH.
**Interview:** For certain cross-origin requests, the browser first sends an `OPTIONS` request to ask whether the method and headers are allowed. For certain non-simple cross-origin requests, the browser first sends an OPTIONS request asking whether the actual method/headers are allowed.
**Remember:** Ask permission before the real request.

## What is XSS?
**Answer:** Cross-site scripting happens when untrusted data is executed as script in a page. Prevent it with safe rendering/escaping, careful HTML handling, and defense-in-depth such as CSP.
**Connect:** XSS happens when attacker-controlled content becomes executable in the trusted page origin. Because injected script gets the page's privileges, defenses include output escaping, safe DOM APIs, sanitization for allowed HTML, CSP, and avoiding unsafe script construction.
**Example:** Rendering an untrusted comment with raw `innerHTML` can turn `<script>`/event-handler payloads into code execution if not safely handled.
**Interview:** Cross-site scripting happens when untrusted data is executed as script in a page. Prevent it with safe rendering/escaping, careful HTML handling, and defense-in-depth such as CSP. XSS happens when attacker-controlled content becomes executable in the trusted page origin.
**Remember:** Untrusted data becomes executable code.

## What is CSRF?
**Answer:** CSRF tricks a browser into sending an authenticated request the user did not intend, usually by abusing automatically included credentials such as cookies.
**Connect:** CSRF abuses the browser's ability to automatically attach credentials such as cookies to requests, tricking a logged-in browser into sending an unwanted state-changing request. Defenses include SameSite cookies, CSRF tokens, and checking Origin/Referer where appropriate.
**Example:** A malicious page causes the victim's browser to submit a transfer form to a bank site while the bank session cookie is automatically included.
**Interview:** CSRF tricks a browser into sending an authenticated request the user did not intend, usually by abusing automatically included credentials such as cookies. CSRF abuses the browser's ability to automatically attach credentials such as cookies to requests, tricking a logged-in browser into sending an unwanted state-changing request.
**Remember:** A malicious site causes your browser to act on another site.

## How does `SameSite` help with CSRF?
**Answer:** The cookie `SameSite` attribute limits when cookies are sent in cross-site contexts, reducing opportunities for cross-site request forgery.
**Connect:** SameSite controls when cookies are sent in cross-site contexts. `Lax`/`Strict` can block many ambient-cookie CSRF scenarios, while `None` allows cross-site sending and requires `Secure`; exact navigation/method rules matter.
**Example:** A session cookie with an appropriate SameSite policy may not be attached to a malicious cross-site POST, removing the victim's ambient authentication from that request.
**Interview:** The cookie `SameSite` attribute limits when cookies are sent in cross-site contexts, reducing opportunities for cross-site request forgery. SameSite controls when cookies are sent in cross-site contexts. The key idea is: Restrict cross-site cookie sending.
**Remember:** Restrict cross-site cookie sending.

## What is an `HttpOnly` cookie?
**Answer:** An `HttpOnly` cookie is not exposed to JavaScript through `document.cookie`. This reduces token theft through injected scripts, though it does not prevent XSS itself.
**Connect:** HttpOnly keeps a cookie out of JavaScript APIs such as `document.cookie`, while the browser can still send it with matching HTTP requests. This is useful for session credentials because XSS cannot directly read and steal that cookie value, although XSS can still perform actions through the page.
**Example:** A server sets the session cookie with `HttpOnly`; application JavaScript never needs to read the raw session ID.
**Interview:** An `HttpOnly` cookie is not exposed to JavaScript through `document.cookie`. This reduces token theft through injected scripts, though it does not prevent XSS itself. HttpOnly keeps a cookie out of JavaScript APIs such as `document.cookie`, while the browser can still send it with matching HTTP requests.
**Remember:** Browser sends it; JS cannot read it.

## What does the `Secure` cookie attribute do?
**Answer:** It instructs the browser to send the cookie only over secure HTTPS connections, subject to browser rules.
**Connect:** The Secure attribute tells the browser to send the cookie only over secure HTTPS connections (with local development nuances). It protects against accidentally transmitting that cookie over plaintext HTTP.
**Example:** A production session cookie should normally be Secure so an `http://` request cannot carry it.
**Interview:** It instructs the browser to send the cookie only over secure HTTPS connections, subject to browser rules. The Secure attribute tells the browser to send the cookie only over secure HTTPS connections (with local development nuances). The key idea is: HTTPS-only cookie transport.
**Remember:** HTTPS-only cookie transport.

## Cookies vs `localStorage`?
**Answer:** Cookies can be sent automatically with HTTP requests and support security attributes. `localStorage` is client-side string storage accessible to JavaScript and is not automatically sent with requests.
**Connect:** Cookies are automatically attached to matching HTTP requests and support security attributes such as HttpOnly/SameSite/Secure; localStorage is client-side string storage accessible to page JavaScript and is never automatically sent as a header. They solve different problems.
**Example:** Use a cookie for a server session when you want browser-managed request credentials; localStorage can store non-sensitive client preferences such as a dismissed-tip flag.
**Interview:** Cookies can be sent automatically with HTTP requests and support security attributes. `localStorage` is client-side string storage accessible to JavaScript and is not automatically sent with requests. Cookies are automatically attached to matching HTTP requests and support security attributes such as HttpOnly/SameSite/Secure; localStorage is client-side string storage accessible to page JavaScript and is never automatically sent as a header.
**Remember:** Cookies participate in HTTP; localStorage stays in JS storage.

## `localStorage` vs `sessionStorage`?
**Answer:** `localStorage` persists across browser sessions for an origin. `sessionStorage` is scoped to a tab/session and is cleared when that session ends.
**Connect:** Both are synchronous, origin-scoped string key-value stores exposed to JavaScript. `localStorage` persists beyond the current tab/browser session, while `sessionStorage` is tied to a particular browsing session/tab and disappears when it ends.
**Example:** Store a long-lived theme preference in localStorage; keep a tab-specific temporary wizard value in sessionStorage if that lifetime matches the product need.
**Interview:** `localStorage` persists across browser sessions for an origin. `sessionStorage` is scoped to a tab/session and is cleared when that session ends. Both are synchronous, origin-scoped string key-value stores exposed to JavaScript. The key idea is: Persistent origin storage vs tab-session storage.
**Remember:** Persistent origin storage vs tab-session storage.

## Why is storing auth tokens in `localStorage` debated?
**Answer:** Any JavaScript running in the origin can read `localStorage`, so successful XSS can steal the token. HttpOnly cookie designs can remove direct JavaScript access to the credential.
**Connect:** The debate centers on XSS exposure: any script executing in the page origin can read localStorage and steal a bearer token. HttpOnly cookie sessions hide the token from JS but require proper CSRF/SameSite design and have their own architecture tradeoffs.
**Example:** There is no storage mechanism that makes XSS harmless; choose an auth design around your threat model and harden the app against script injection.
**Interview:** Any JavaScript running in the origin can read `localStorage`, so successful XSS can steal the token. HttpOnly cookie designs can remove direct JavaScript access to the credential. The debate centers on XSS exposure: any script executing in the page origin can read localStorage and steal a bearer token.
**Remember:** XSS can read JS-accessible storage.

## What is Content Security Policy?
**Answer:** CSP is a response policy that restricts where scripts and other resources can load from and which script execution patterns are allowed. It is a strong defense-in-depth tool against XSS.
**Connect:** CSP lets a site declare which sources of scripts, styles, frames, and other resources are allowed. A strong script policy can make many injected XSS payloads unable to execute, acting as defense in depth rather than replacing output safety.
**Example:** A nonce-based script-src policy can allow only scripts carrying the server-generated nonce and block arbitrary inline injected script.
**Interview:** CSP is a response policy that restricts where scripts and other resources can load from and which script execution patterns are allowed. It is a strong defense-in-depth tool against XSS. CSP lets a site declare which sources of scripts, styles, frames, and other resources are allowed.
**Remember:** Tell the browser what content is allowed to execute/load.
