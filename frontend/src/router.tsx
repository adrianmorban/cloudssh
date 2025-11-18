import { createRootRoute, createRoute, Router } from "@tanstack/react-router";
import { RootLayout } from "./layout/RootLayout";
import { NewTab } from "./pages/NewTab";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: NewTab,
});

export const router = new Router({
  routeTree: rootRoute.addChildren([
    indexRoute,
  ]),
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}