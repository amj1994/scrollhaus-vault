import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", background: "#0E0E0E", color: "#FCFCFC" }}>
      <div style={{ maxWidth: 420, textAlign: "center" }}>
        <h1 style={{ fontSize: 48, fontWeight: 700 }}>404</h1>
        <h2 style={{ marginTop: 16, fontSize: 20, fontWeight: 600 }}>Page not found</h2>
        <p style={{ marginTop: 8, fontSize: 14, opacity: 0.6 }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ marginTop: 24 }}>
          <Link to="/" style={{ color: "#FCFCFC", textDecoration: "underline" }}>
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", background: "#0E0E0E", color: "#FCFCFC" }}>
      <div style={{ maxWidth: 420, textAlign: "center" }}>
        <h1 style={{ fontSize: 20, fontWeight: 600 }}>This page didn't load</h1>
        <p style={{ marginTop: 8, fontSize: 14, opacity: 0.6 }}>
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 8 }}>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            style={{ padding: "8px 16px", borderRadius: 6, background: "#FCFCFC", color: "#0E0E0E", border: 0, cursor: "pointer" }}
          >
            Try again
          </button>
          <a href="/" style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.2)", color: "#FCFCFC", textDecoration: "none" }}>
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pictura — Find the photo that reflects your ideas" },
      {
        name: "description",
        content: "Explore, inspire, create – discover visuals that bring your vision to life.",
      },
      { property: "og:title", content: "Pictura — Find the photo that reflects your ideas" },
      {
        property: "og:description",
        content: "Explore, inspire, create – discover visuals that bring your vision to life.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "https://qclay.design/lovable/pictura/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
