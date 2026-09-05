---
title: "Authentication, Sessions & Tokens"
order: 17
---

## What is authentication?
**Answer:** Authentication answers: "Who are you?"
**Connect:** A user proves an identity using something such as a password, passkey, one-time code, social login, or enterprise identity provider.
**Example:** Logging in with email and password authenticates the user before the application creates or resumes a session.
**Interview:** Authentication verifies identity. After authentication, the system usually establishes a session or issues credentials that identify later requests.
**Remember:** Authentication = identity.

## What is authorization?
**Answer:** Authorization answers: "What are you allowed to do?"
**Connect:** Authentication usually happens first. Authorization then checks permissions for a particular resource or action.
**Example:** Two authenticated users may both be logged in, but only an admin can delete another user's account.
**Interview:** Authentication proves who the caller is; authorization decides whether that identity is permitted to perform a specific action.
**Remember:** AuthN = who. AuthZ = allowed to do what.

## Authentication vs authorization?
**Answer:** Authentication establishes identity. Authorization enforces permissions.
**Connect:** Being logged in does not mean the user is allowed to perform every operation.
**Example:** `401` often means the request lacks valid authentication. `403` means the server understood the identity but refuses the action.
**Interview:** I keep authentication and authorization conceptually separate. The frontend may hide unavailable actions, but the server must enforce authorization.
**Remember:** Login is not permission.

## What is session-based authentication?
**Answer:** The server stores session state and the browser sends a session identifier on later requests.
**Connect:** After login, the server creates a session record. The browser typically stores only an opaque session ID in a cookie.
**Example:** ```text
Cookie: session_id=abc123
```
The server looks up `abc123` to identify the authenticated user.
**Interview:** In session-based auth, the credential sent by the browser is usually an opaque session ID while the important authentication state lives on the server.
**Remember:** Browser holds the key; server holds the session.

## What is token-based authentication?
**Answer:** The client sends a token that the server validates on each request.
**Connect:** The token may be opaque or self-contained, such as a JWT. The server may not need a traditional session lookup for every request.
**Example:** ```http
Authorization: Bearer eyJ...
```
**Interview:** Token-based authentication uses a credential carried with requests. The server validates the token and derives the caller's identity and possibly claims from it.
**Remember:** Token travels with the request.

## Session authentication vs token authentication?
**Answer:** The main difference is where authentication state lives and how requests prove identity.
**Connect:** Traditional sessions keep state server-side and send an opaque session ID. Token systems may encode or reference identity in a bearer token sent by the client.
**Example:** A web app might send an opaque `session_id` cookie to its own backend, while a mobile client might send a bearer access token to an API.
**Interview:** I choose based on system boundaries and security requirements rather than assuming JWT is automatically better. Browser applications often work very well with secure server-managed sessions.
**Remember:** Sessions are not outdated; tokens are not automatically superior.

## What is a JWT?
**Answer:** JWT stands for JSON Web Token. It is a compact signed token format containing claims.
**Connect:** A typical JWT has a header, payload, and signature. The signature helps detect modification.
**Example:** ```text
header.payload.signature
```
**Interview:** A JWT is a signed token format. The payload can be decoded by the holder, so I do not treat JWT contents as secret unless they are separately encrypted.
**Remember:** Signed does not mean encrypted.

## Is a JWT encrypted?
**Answer:** Usually, no.
**Connect:** Normal signed JWTs protect integrity, not confidentiality. Anyone holding the token can typically Base64-decode its header and payload.
**Example:** Putting a password or secret API key inside a normal JWT payload would expose it to whoever receives the token.
**Interview:** Standard signed JWTs are readable but tamper-evident. I never put secrets in the payload just because the token has a signature.
**Remember:** JWT payload is readable.

## What is an access token?
**Answer:** An access token is a credential used to call protected APIs.
**Connect:** Access tokens are commonly short-lived so that a stolen token has a limited useful lifetime.
**Example:** ```http
Authorization: Bearer <access-token>
```
**Interview:** The access token is the credential presented to resource servers. I generally expect it to be short-lived and limited in scope.
**Remember:** Access token = use APIs now.

## What is a refresh token?
**Answer:** A refresh token is used to obtain a new access token without asking the user to log in again.
**Connect:** Because refresh tokens can extend a session, they are more sensitive and usually live longer than access tokens.
**Example:** When a 10-minute access token expires, the client can use a valid refresh token to obtain a new access token without showing the login screen again.
**Interview:** I treat refresh tokens as high-value credentials. They should be stored and transported more carefully than ordinary application state.
**Remember:** Refresh token = get another access token.

## Why use short-lived access tokens?
**Answer:** Short lifetimes reduce the damage if a token is stolen.
**Connect:** A stolen bearer token can often be used by whoever possesses it until it expires or is revoked.
**Example:** If a stolen access token expires in 10 minutes instead of 30 days, the attacker has a much smaller window to use it.
**Interview:** Short-lived access tokens limit exposure, while refresh mechanisms maintain usability without making the primary API credential long-lived.
**Remember:** Short-lived token = smaller blast radius.

## What is refresh-token rotation?
**Answer:** Each successful refresh replaces the old refresh token with a new one.
**Connect:** Reuse of an already-rotated token can signal token theft or replay.
**Example:** Refresh token A is exchanged for a new access token plus refresh token B. If A is later reused, the server can treat that as suspicious.
**Interview:** Rotation reduces the usefulness of a stolen refresh token and can help detect reuse because a refresh token is expected to be single-use.
**Remember:** Refresh once, replace it.

## What is a bearer token?
**Answer:** A bearer token is usable by whoever possesses it.
**Connect:** It usually does not prove that the caller is the original legitimate owner of the token.
**Example:** ```http
Authorization: Bearer <token>
```
**Interview:** Bearer tokens must be protected like credentials because possession is usually enough to authenticate a request.
**Remember:** Whoever bears it can use it.

## Where should authentication tokens be stored in a browser?
**Answer:** There is no single answer for every architecture, but long-lived sensitive credentials should not be casually exposed to JavaScript.
**Connect:** `localStorage` is easy to use but readable by JavaScript, so XSS can steal its contents. `HttpOnly` cookies cannot be read by JavaScript, which is valuable for session or refresh credentials.
**Example:** A BFF can keep OAuth access and refresh tokens on the server while the browser holds only a `Secure`, `HttpOnly` session cookie.
**Interview:** For browser applications, I prefer keeping high-value session credentials inaccessible to JavaScript when the architecture allows it, commonly using secure `HttpOnly` cookies.
**Remember:** Keep valuable credentials away from JavaScript when possible.

## Why is storing an auth token in `localStorage` controversial?
**Answer:** Any JavaScript running in the page's origin can read `localStorage`.
**Connect:** If the application has an XSS vulnerability, malicious JavaScript may exfiltrate a stored bearer token and use it elsewhere.
**Example:** An injected XSS script can run `localStorage.getItem('token')` and send that bearer token to an attacker.
**Interview:** `localStorage` is convenient but increases token theft risk under XSS. I do not store long-lived high-value bearer credentials there by default.
**Remember:** XSS + localStorage token = token theft risk.

## Does using an `HttpOnly` cookie eliminate XSS risk?
**Answer:** No.
**Connect:** `HttpOnly` prevents JavaScript from reading the cookie value, but injected JavaScript can still perform actions as the user, read accessible page data, or call APIs from the compromised page.
**Example:** Injected JavaScript cannot read an `HttpOnly` session cookie, but it may still call protected APIs from the compromised page as the logged-in user.
**Interview:** `HttpOnly` protects the cookie from direct JavaScript access, but it does not make XSS harmless. XSS prevention still matters.
**Remember:** HttpOnly protects the credential, not the whole application.

## What is login session lifecycle?
**Answer:** A typical lifecycle is authenticate → establish session → use session → refresh or renew → logout or expire.
**Connect:** Good designs define expiry, renewal, revocation, logout behavior, multiple tabs, multiple devices, and server-side invalidation.
**Example:** A user logs in, receives a session, uses it for requests, renews it when appropriate, and eventually logs out or reaches expiry.
**Interview:** I think about authentication as a lifecycle, not just a login endpoint. Expiration, renewal, logout, and revocation are part of the design.
**Remember:** Auth is a lifecycle.

## What should happen on logout?
**Answer:** The application should invalidate or remove the credentials that maintain the authenticated session.
**Connect:** Clearing UI state alone is not enough if the server session or refresh credential remains valid.
**Example:** Delete the browser session cookie and invalidate the corresponding server-side session.
**Interview:** Logout should terminate the actual security session, not merely redirect the user to a login page.
**Remember:** Logout must kill the credential, not just the UI.

## How should frontend logout work across multiple tabs?
**Answer:** Tabs should converge on the same logged-out state.
**Connect:** Depending on storage and architecture, applications can use the `storage` event, `BroadcastChannel`, shared session state, or failed-auth responses to synchronize logout.
**Example:** If the user logs out in tab A, a `BroadcastChannel` message can tell tabs B and C to clear authenticated UI immediately.
**Interview:** I make logout a cross-tab event so another open tab cannot continue displaying stale authenticated UI.
**Remember:** One logout should reach every tab.

## What is OAuth 2.0?
**Answer:** OAuth 2.0 is an authorization framework for granting an application limited access to protected resources.
**Connect:** It is commonly used when one application needs permission to access another service on a user's behalf.
**Example:** A calendar application asking for permission to read a user's Google Calendar.
**Interview:** OAuth is primarily about delegated authorization, not proving user identity by itself.
**Remember:** OAuth = delegated access.

## What is OpenID Connect?
**Answer:** OpenID Connect adds an identity layer on top of OAuth 2.0.
**Connect:** OAuth answers questions about access. OpenID Connect provides standardized information about authentication and the user's identity.
**Example:** “Sign in with Google” commonly uses OpenID Connect to tell your application which user authenticated.
**Interview:** I use OpenID Connect when the application needs login and identity information, while OAuth provides the underlying authorization flows.
**Remember:** OAuth grants access; OIDC adds identity.

## What is PKCE?
**Answer:** PKCE adds a proof step to the authorization-code flow so a stolen authorization code is harder to redeem.
**Connect:** The client generates a secret-like `code_verifier` and sends a derived `code_challenge` before authentication. The authorization server later requires the original verifier when exchanging the code.
**Example:** The SPA sends a derived `code_challenge` during authorization and must later provide the matching `code_verifier` to exchange the returned code.
**Interview:** PKCE binds the authorization code to the client instance that initiated the flow, which is especially important for public clients such as browser and mobile apps.
**Remember:** Stolen code is useless without the verifier.

## Why should a SPA use Authorization Code flow with PKCE instead of the old Implicit flow?
**Answer:** The authorization code flow avoids returning long-lived credentials directly in the browser URL and PKCE protects code exchange.
**Connect:** Modern browser OAuth flows favor short-lived authorization codes plus PKCE rather than exposing access tokens through front-channel redirects.
**Example:** The browser receives a short-lived authorization code and exchanges it with PKCE instead of receiving an access token directly in the redirect URL.
**Interview:** For a SPA, I use Authorization Code with PKCE rather than the legacy Implicit flow because it provides a safer token exchange model for a public client.
**Remember:** Modern SPA OAuth = code + PKCE.

## What is a BFF pattern for frontend authentication?
**Answer:** BFF means Backend for Frontend. The browser talks to an application-specific backend instead of directly managing every downstream API credential.
**Connect:** The BFF can keep sensitive tokens server-side and expose a secure session cookie to the browser.
**Example:** Browser → Next.js BFF → protected APIs.
**Interview:** A BFF can simplify browser authentication by keeping high-value OAuth tokens out of browser JavaScript while the browser maintains a secure session with the BFF.
**Remember:** Browser holds session; BFF holds downstream tokens.

## What is `401 Unauthorized`?
**Answer:** It generally means the request lacks valid authentication credentials.
**Connect:** The name is confusing: `401` is primarily an authentication problem.
**Example:** Missing, expired, or invalid session/token.
**Interview:** I treat `401` as "authenticate again or provide valid credentials."
**Remember:** 401 = who are you?

## What is `403 Forbidden`?
**Answer:** The server understood the request but refuses the action.
**Connect:** The caller may already be authenticated but lacks permission.
**Example:** A regular user calls an admin-only endpoint.
**Interview:** `403` usually means the identity is known, but that identity is not authorized to perform the requested action.
**Remember:** 403 = I know you, but no.

## Should the frontend enforce authorization?
**Answer:** The frontend can improve UX, but it cannot be the security boundary.
**Connect:** Users control their browser and can modify frontend code, requests, or hidden UI elements.
**Example:** Hiding an "Delete user" button is useful UX, but the API must still reject unauthorized delete requests.
**Interview:** I mirror permissions in the UI for usability, but authorization must always be enforced by the backend.
**Remember:** Frontend hides; backend protects.

## What is an authentication race condition in the frontend?
**Answer:** The UI may render or request data before authentication state is known.
**Connect:** On page load, the app might initially think the user is logged out, then discover a valid session, causing flicker or incorrect redirects.
**Example:** On refresh, the app briefly renders the login page before `/session` finishes and confirms that the user is already authenticated.
**Interview:** I model authentication with an explicit loading or unknown state instead of assuming the user is logged out until the session check completes.
**Remember:** Auth state is often `unknown` before it is true or false.

## How should an app handle an expired access token?
**Answer:** Detect the authentication failure and renew the credential only when a valid renewal mechanism exists.
**Connect:** Multiple concurrent API requests may all fail at once, so refresh logic often needs coordination to avoid sending many refresh requests.
**Example:** Ten API calls return `401` at once; the client performs one refresh, lets the other calls wait, then retries them after refresh succeeds.
**Interview:** I centralize token renewal, deduplicate concurrent refresh attempts, retry safe failed requests after a successful refresh, and force reauthentication if renewal fails.
**Remember:** One refresh, many waiting requests.

## Why can automatic API retries be dangerous with authentication?
**Answer:** Not every failure should be retried blindly.
**Connect:** Repeated `401` responses can create retry loops. Retrying non-idempotent operations may also duplicate side effects.
**Example:** A client that responds to every `401` by refreshing and blindly retrying can enter an infinite loop when the refresh credential is also expired.
**Interview:** I distinguish token renewal from generic retries and never create an infinite 401-refresh-retry loop.
**Remember:** Authentication failures need controlled recovery.

## What is session fixation?
**Answer:** Session fixation happens when an attacker causes a victim to authenticate using a session identifier the attacker already knows.
**Connect:** A common defense is rotating the session identifier when authentication privilege changes.
**Example:** An attacker supplies a known session ID before login; if the server keeps that same ID after the victim authenticates, the attacker may reuse it.
**Interview:** After login or privilege elevation, I expect the server to issue a fresh session identifier rather than continuing an attacker-controlled pre-login session.
**Remember:** Login should rotate the session.

## What is session revocation?
**Answer:** Revocation invalidates an authentication session before its natural expiry.
**Connect:** It is useful after logout, password changes, device removal, suspicious activity, or administrator action.
**Example:** After a user clicks “Sign out of all devices,” the server invalidates all active sessions even though their normal expiry time has not arrived.
**Interview:** A production auth design needs a way to invalidate compromised or unwanted sessions, not just wait for expiration.
**Remember:** Expiry is passive; revocation is active.

## What is MFA?
**Answer:** Multi-factor authentication requires evidence from more than one factor category.
**Connect:** Common factors are something you know, something you have, and something you are.
**Example:** Password plus a hardware security key.
**Interview:** MFA reduces the impact of a compromised password because the attacker still needs another independent factor.
**Remember:** More than one independent factor.

## What is a passkey?
**Answer:** A passkey is a phishing-resistant credential based on public-key cryptography.
**Connect:** The server stores a public key. The user's device protects the corresponding private key and signs a challenge during authentication.
**Example:** The browser or device signs a server challenge with a private key; the server verifies the signature using the stored public key.
**Interview:** Passkeys replace shared secrets with public-key credentials, which makes them resistant to password reuse and typical phishing attacks.
**Remember:** Server keeps public key; private key stays with the user.
