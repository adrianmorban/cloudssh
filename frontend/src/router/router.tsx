import { createRootRoute, createRoute, Router, redirect } from "@tanstack/react-router";
import { RootLayout } from "../layout/RootLayout";
import { NewTab } from "../pages/NewTab";
import { serverTabsStore } from "../stores/severTabs.store";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const TabView = () => {
  const { tabId } = tabRoute.useParams();
  const state = serverTabsStore.state;
  const tab = state.tabs.find(t => t.id === tabId);

  if (!tab) {
    return <div>Tab not found</div>;
  }

  if (tab.type === "newtab") {
    return <NewTab key={tabId} />;
  }

  return <div>Server Tab: {tab.serverName}</div>;

}

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
});

const tabRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tab/$tabId",
  component: TabView,

  beforeLoad: ({ params }) => {
    const state = serverTabsStore.state;
    const tab = state.tabs.find(tab => tab.id === params.tabId);
    if (!tab) {
      throw redirect({ to: "/" });
    }

    return { tab }
  },
});

export const router = new Router({
  routeTree: rootRoute.addChildren([
    indexRoute,
    tabRoute,
  ]),
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}