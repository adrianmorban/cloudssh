import React from "react";
import { MinusIcon, SquareIcon, XIcon } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import Tab from "../components/tab";
import { useServerTabs } from "../hooks/useServerTabs";
import type { ServerTab } from "../stores/severTabs.store";

export const Navbar: React.FC = () => {
    const { tabs, activeTabId, setActiveTab, closeTab, createNewTab } = useServerTabs();

    const createNewTabHandler = () => {
        createNewTab();
    }

    return (
        <nav style={{ WebkitAppRegion: "drag" } as React.CSSProperties} className="w-full h-12  bg-bg-secondary flex items-center border-border/50 border-b">
            <div style={{ WebkitAppRegion: "drag" } as React.CSSProperties} className="w-full h-full grid grid-cols-[1fr_auto]">
                <div style={{ WebkitAppRegion: "drag" } as React.CSSProperties} className="flex gap-2 h-full items-center overflow-x-auto py-2 px-8">
                    {tabs.map((tab: ServerTab) => (
                        <Tab key={tab.id} onClick={() => setActiveTab(tab.id)} active={tab.id === activeTabId} label={tab.label} onClose={() => closeTab(tab.id)} />
                    ))}
                    <button onClick={createNewTabHandler} className="text-light hover:bg-bg-tertiary h-full aspect-square flex justify-center items-center cursor-pointer rounded-md transition-all duration-300">
                        <HugeiconsIcon icon={PlusSignIcon} size={16} color="white" strokeWidth={1} />
                    </button>
                </div>
                <div className="flex h-full">
                    <button className="text-white hover:bg-gray-700 h-full aspect-square flex justify-center items-center cursor-pointer">
                        <MinusIcon size={16} />
                    </button>
                    <button className="text-white hover:bg-gray-700 h-full aspect-square flex justify-center items-center cursor-pointer">
                        <SquareIcon size={12} />
                    </button>
                    <button className="text-white hover:bg-red-600 h-full aspect-square flex justify-center items-center cursor-pointer">
                        <XIcon size={16} />
                    </button>
                </div>
            </div>
        </nav>
    );
}