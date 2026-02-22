import React, { useState } from "react";
import { MinusIcon, XIcon, Maximize2Icon, Minimize2Icon } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import Tab from "../components/tab";
import { useServerTabs } from "../hooks/useServerTabs";
import type { ServerTab } from "../stores/severTabs.store";
import { WindowMinimise, WindowToggleMaximise, WindowFullscreen, WindowUnfullscreen, Quit } from "../../wailsjs/runtime/runtime";

export const Navbar: React.FC = () => {
    const { tabs, activeTabId, setActiveTab, closeTab, createNewTab } = useServerTabs();
    const [isFullscreen, setIsFullscreen] = useState(false);

    const createNewTabHandler = () => {
        createNewTab();
    }

    const handleMinimize = () => {
        WindowMinimise();
    };

    const handleMaximize = () => {
        WindowToggleMaximise();
    };

    const handleFullscreen = () => {
        if (isFullscreen) {
            WindowUnfullscreen();
        } else {
            WindowFullscreen();
        }
        setIsFullscreen(!isFullscreen);
    };

    const handleClose = () => {
        Quit();
    };

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
                <div className="flex h-full" style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
                    <button onClick={handleMinimize} className="text-white hover:bg-gray-700 h-full aspect-square flex justify-center items-center cursor-pointer">
                        <MinusIcon size={16} />
                    </button>
                    <button onClick={handleFullscreen} className="text-white hover:bg-gray-700 h-full aspect-square flex justify-center items-center cursor-pointer">
                        {isFullscreen ? <Minimize2Icon size={16} /> : <Maximize2Icon size={16} />}
                    </button>
                    <button onClick={handleClose} className="text-white hover:bg-red-600 h-full aspect-square flex justify-center items-center cursor-pointer">
                        <XIcon size={16} />
                    </button>
                </div>
            </div>
        </nav>
    );
}