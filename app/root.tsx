import { Main } from "@/components/main";
import { SkipNavLink } from "@/components/skip-link";
import { RootLayout as DefaultLayout } from "@/layouts";

import { config } from "@/lib/constants";
import { commitSession, getSession } from "@/lib/sessions.server";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  data,
  isRouteErrorResponse,
} from "react-router";

import type { Route } from "./+types/root";

import "@/assets/styles/globals.css";
//@ts-expect-error
import "@fontsource-variable/inconsolata";
//@ts-expect-error
import "@fontsource-variable/inter";
//@ts-expect-error
import "@fontsource-variable/lora";
import { tw } from "./helpers/tailwind";

export const links: Route.LinksFunction = () =>
  [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/favicon.svg",
      sizes: "32x32",
    },
  ].filter(Boolean);

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  return data(
    { config: {} },
    { headers: { "Set-Cookie": await commitSession(session) } },
  );
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  await request.formData();

  session.set("__session", false);
  return new Response(null, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export default function App() {
  return <Outlet />;
}

type LayoutProps = React.PropsWithChildren<unknown>;

export const Layout = ({ children }: LayoutProps) => {
  return (
    <html
      lang="en"
      data-theme={config.defaultTheme}
      data-font={config.defaultFont}
      className="antialiased"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="referrer" content="origin-when-cross-origin" />
        {/* Primary Meta Tags */}
        <meta name="application-name" content={config.application_name} />
        <meta name="generator" content="Vite 6.0" />
        <meta name="keywords" content={[].join(",")} />
        <meta name="creator" content={config.author} />
        <meta name="publisher" content={config.author} />

        <meta name="color-scheme" content="dark light" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fafafa"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#333333"
        />
        <meta name="msapplication-TileColor" content="#fafafa" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-status-bar-style" content="black-translucent" />

        <meta name="robots" content="index follow" />
        <meta
          name="googlebot"
          content="max-snippet:160 max-image-preview:-1 max-video-preview:-1"
        />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:locale" content={config.locale} />
        <meta property="og:site_name" content={config.application_name} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content={`@${config.author}`} />
        <Meta />
        <Links />
      </head>
      <body
        className={tw([
          "relative font-normal antialiased",
          "bg-white text-grey-900 dark:bg-grey-900 dark:text-white",
          "sans:font-sans mono:font-mono serif:font-serif",
          "grid min-h-screen grid-rows-[auto_1fr_auto] supports-[min-height:100svh]:min-h-svh",
        ])}
      >
        <SkipNavLink />
        <DefaultLayout>
          {children} {/* <Main>{children}</Main> */}
        </DefaultLayout>
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
