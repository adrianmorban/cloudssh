import { Store } from "@tanstack/react-store";

export type ServerTab = {
    id: string;
    type: "newtab" | "server";
    serverId?: string;
    serverName?: string;
    label: string;
    activeView?: "ssh" | "sftp" | "logs" | "config";
};

type ServerTabsState = {
    tabs: ServerTab[];
    activeTabId: string | null;
};

const loadInitialState = (): ServerTabsState => {
    try {
        const saved = localStorage.getItem("serverTabsState");
        if (saved) {
            return JSON.parse(saved) as ServerTabsState;
        }
    } catch (error) {
        console.error('Error loading tabs from localStorage', error);
    }

    const initialTab: ServerTab  = {
        id: `tab-${Date.now()}`,
        type: "newtab",
        label: "New Tab",
    };

    return {
        tabs: [initialTab],
        activeTabId: initialTab.id,
    };

};

export const serverTabsStore = new Store<ServerTabsState>(loadInitialState());

serverTabsStore.subscribe(() => {
    const state = serverTabsStore.state;
    localStorage.setItem('serverTabs', JSON.stringify(state));
});

// Actions
export const serverTabsActions = {
    createNewTab: () => {
        const newTab: ServerTab = {
            id: `tab-${Date.now()}`,
            type: "newtab",
            label: "New Tab",
        };
        serverTabsStore.setState((state) => ({
            ...state,
            tabs: [...state.tabs, newTab],
            activeTabId: newTab.id,
        }));
    },

    openServerInTab: (tabId: string, server: { id: string; name: string }) => {
        serverTabsStore.setState((state) => ({
            ...state,
            tabs: state.tabs.map((tab) =>
                tab.id === tabId ? {
                    ...tab,
                    type: "server" as const,
                    serverId: server.id,
                    serverName: server.name,
                    activeView: "ssh" as const
                }
                : tab
            ),
        }));
    },

    closeTab: (id: string) => {
        serverTabsStore.setState((state) => {
            const filtered = state.tabs.filter((t) => t.id !== id);
      
            // Si no quedan tabs, crear una NewTab
            if (filtered.length === 0) {
                const newTab: ServerTab = {
                    id: `tab-${Date.now()}`,
                    type: "newtab",
                    label: "New Tab",
                };
                
                return {
                    tabs: [newTab],
                    activeTabId: newTab.id
                };
            }
      
            const newActiveId = state.activeTabId === id ? filtered[filtered.length - 1].id : state.activeTabId;
      
            return {
                tabs: filtered,
                activeTabId: newActiveId
            };
        });
    },

    setActiveTab: (id: string) => {
        serverTabsStore.setState((state) => ({
            ...state,
            activeTabId: id
        }));
    },

    setActiveView: (tabId: string, view: "ssh" | "sftp" | "logs" | "config") => {
        serverTabsStore.setState((state) => ({
            ...state,
            tabs: state.tabs.map((tab) =>
                tab.id === tabId && tab.type === "server" ? { ...tab, activeView: view } : tab
            ),
        }));
    },

    resetTabToNew: (tabId: string) => {
        serverTabsStore.setState((state) => ({
            ...state,
            tabs: state.tabs.map((tab) => tab.id === tabId? {
                id: tab.id,
                type: "newtab" as const,
                label: "New Tab",
                } : tab
            )
        }));
    }
};