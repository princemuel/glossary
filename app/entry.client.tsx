/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

startTransition(() => {
  clearBrowserExtensionInjectionsBeforeHydration();
  const root = hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
    {
      onRecoverableError: () => {
        console.error("Hydration failed! Attempting recovery...");
        root.render(
          <StrictMode>
            <HydratedRouter />
          </StrictMode>,
        );
        console.info("Recovery successful!");
      },
    },
  );
});

function clearBrowserExtensionInjectionsBeforeHydration() {
  const nodes = document.querySelectorAll(
    [
      "html > *:not(body, head)",
      'script[src*="-extension://"]',
      'link[href*="-extension://"]',
    ].join(", "),
  );

  for (const node of nodes) node.remove();
  const $targets = new Map([
    [
      "html",
      {
        $elm: document.documentElement,
        allowedAttributes: new Set(["lang", "dir", "class"]),
      },
    ],
    [
      "head",
      {
        $elm: document.head,
        allowedAttributes: new Set([""]),
      },
    ],
    [
      "body",
      {
        $elm: document.body,
        allowedAttributes: new Set(["class"]),
      },
    ],
  ]);

  for (const { $elm, allowedAttributes } of $targets.values()) {
    if (!$elm) continue;
    for (const attr of $elm.getAttributeNames()) {
      if (!allowedAttributes.has(attr)) {
        console.info(
          `Removing disallowed attribute: '${attr}' from <${$elm.tagName.toLowerCase()}>`,
        );
        $elm.removeAttribute(attr);
      }
    }
  }
}
