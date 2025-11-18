import { useStore } from '@tanstack/react-store';
import { serverTabsStore, serverTabsActions } from '../stores/severTabs.store';

export function useServerTabs() {
    const tabs = useStore(serverTabsStore, (state) => state.tabs);
    const activeTabId = useStore(serverTabsStore, (state) => state.activeTabId);
    const activeTab = tabs.find(t => t.id === activeTabId);

    return {
        tabs,
        activeTabId,
        activeTab,
        ...serverTabsActions
    };
}