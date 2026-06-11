redirectWithParams

Purpose

- Small client-side helper to navigate while preserving existing query parameters (UTMs, fbclid, etc.).

Usage

- Import and call from client components:

  import { redirectWithParams } from "../lib/redirect"
  redirectWithParams("/conteudo?renew=1&email=...")

Behavior

- If run in the browser, it reads the current URL's search parameters and appends any that the target URL doesn't already define.
- It then sets `window.location.href` to the resulting URL.
- If run outside the browser (server), it safely no-ops.

Notes

- Do NOT use this in Next.js server-side `redirect()` calls (layouts/actions). Server redirects run on the server and can't access `window`; those should remain using Next.js `redirect()`.
- The helper intentionally uses a full navigation (`window.location.href`) so all query params and UTM tracking are preserved during cross-page navigation.

Examples

- Preserve UTMs when sending users to the platform:

  redirectWithParams('/plataforma')

- Force renew flow keeping UTMs:

  redirectWithParams(`/conteudo?renew=1&email=${encodeURIComponent(email)}`)
