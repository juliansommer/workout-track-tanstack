import { jsxs, jsx } from "react/jsx-runtime";
import { QueryClient } from "@tanstack/react-query";
import { useRouter, useMatch, rootRouteId, ErrorComponent, Link, createRootRouteWithContext, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
function DefaultCatchBoundary({ error }) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId
  });
  console.error(error);
  return /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 p-4", children: [
    /* @__PURE__ */ jsx(ErrorComponent, { error }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "rounded-sm bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700",
          onClick: () => {
            router.invalidate();
          },
          type: "button",
          children: "Try Again"
        }
      ),
      isRoot ? /* @__PURE__ */ jsx(
        Link,
        {
          className: "rounded-sm bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700",
          to: "/",
          children: "Home"
        }
      ) : /* @__PURE__ */ jsx(
        Link,
        {
          className: "rounded-sm bg-gray-600 px-2 py-1 font-extrabold text-white uppercase dark:bg-gray-700",
          onClick: (e) => {
            e.preventDefault();
            window.history.back();
          },
          to: "/",
          children: "Go Back"
        }
      )
    ] })
  ] });
}
function NotFound({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2 p-2", children: [
    /* @__PURE__ */ jsx("div", { className: "text-gray-600 dark:text-gray-400", children: children || /* @__PURE__ */ jsx("p", { children: "The page you are looking for does not exist." }) }),
    /* @__PURE__ */ jsxs("p", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "rounded-sm bg-emerald-500 px-2 py-1 font-black text-sm text-white uppercase",
          onClick: () => window.history.back(),
          type: "button",
          children: "Go back"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          className: "rounded-sm bg-cyan-600 px-2 py-1 font-black text-sm text-white uppercase",
          to: "/",
          children: "Start Over"
        }
      )
    ] })
  ] });
}
const seo = ({
  title,
  description,
  image
}) => {
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "og:type", content: "website" },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    ...[
      { name: "twitter:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "og:image", content: image }
    ]
  ];
  return tags;
};
const appCss = "/assets/app-B2KeQLoW.css";
const Route$1 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      ...seo({
        title: "Workout Track",
        description: "Workout Track is an open source app that helps you monitor your workouts, set goals, and achieve your fitness dreams.",
        image: "/opengraph-image.png"
      })
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      { rel: "icon", href: "/favicon.ico" }
    ]
  }),
  errorComponent: (props) => {
    return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(DefaultCatchBoundary, { ...props }) });
  },
  notFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 p-2 text-lg", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            activeOptions: { exact: true },
            activeProps: {
              className: "font-bold"
            },
            to: "/",
            children: "Home"
          }
        ),
        " "
      ] }),
      /* @__PURE__ */ jsx("hr", {}),
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter = () => import("./index-BwMT9QHg.js");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$1
});
const rootRouteChildren = {
  IndexRoute
};
const routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {})
  });
  setupRouterSsrQueryIntegration({
    router,
    queryClient
  });
  return router;
}
export {
  getRouter
};
