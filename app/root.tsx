import { Main } from "@/components/main";
import { SkipNavLink } from "@/components/skip-link";
import { RootLayout } from "@/layouts";

import { commitSession, getSession } from "@/lib/sessions.server";

import { useEffect } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  data,
  isRouteErrorResponse,
  useLoaderData,
} from "react-router";
import { getToast } from "remix-toast";
import { Toaster as ToastProvider, toast as notify } from "sonner";

import type { Route } from "./+types/root";

//@ts-expect-error
import "@fontsource-variable/public-sans";
// import "./assets/styles/debug.css"; // uncomment this line to debug your styles
import "./assets/styles/global.css";

export const links: Route.LinksFunction = () =>
  [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-32x32.png",
      sizes: "32x32",
    },
  ].filter(Boolean);

export async function loader({ request }: Route.LoaderArgs) {
  const { toast, headers } = await getToast(request);
  const session = await getSession(request.headers.get("Cookie"));
  const sidebar_state = session.get("__sidebar-session") || "maximized";
  const t = { type: "", message: "", description: "", duration: 5000 };
  return data(
    { config: { sidebar_state }, toast: toast ?? t },
    { headers: { ...headers, "Set-Cookie": await commitSession(session) } },
  );
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const prev_sidebar_state = formData.get("sidebar_state");
  const new_sidebar_state =
    prev_sidebar_state === "maximized" ? "compact" : "maximized";
  session.set("__sidebar-session", new_sidebar_state);
  return new Response(null, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export default function Root() {
  const data = useLoaderData<typeof loader>();
  const t = data.toast;
  useEffect(() => {
    const methods = new Map([
      ["error", notify.error],
      ["success", notify.success],
      ["info", notify.info],
      ["warning", notify.warning],
      ["message", notify.message],
      ["loading", notify.loading],
    ]);
    const toast = methods.get(t.type);
    if (t.type && t.message && toast) toast(t.message, { duration: 4000 });
  }, [t.message, t.type]);

  return <Outlet />;
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="antialiased">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body className="relative min-h-svh bg-white font-normal font-sans">
        <SkipNavLink />
        <RootLayout>{children}</RootLayout>
        <ToastProvider richColors closeButton position="top-center" />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <Main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </Main>
  );
}
