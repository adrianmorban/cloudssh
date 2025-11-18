import React from "react";
import { MinusIcon, SquareIcon, XIcon } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { SidebarLeftIcon } from '@hugeicons/core-free-icons'
import Tab from "../components/tab";

export const Navbar: React.FC = () => {

    return (
        <nav style={{ WebkitAppRegion: "drag" } as React.CSSProperties} className="w-full h-10 bg-bg-primary flex items-center border-border/50 border-b">
            <div style={{ WebkitAppRegion: "drag" } as React.CSSProperties} className="w-full h-full grid grid-cols-[50px_1fr_auto]">
                <div style={{ WebkitAppRegion: "drag" } as React.CSSProperties} className="flex items-center justify-center">
                    <HugeiconsIcon icon={SidebarLeftIcon} size={20} color="white" strokeWidth={1} />
                </div>
                <div style={{ WebkitAppRegion: "drag" } as React.CSSProperties} className="flex gap-2 h-full items-center overflow-x-auto py-1.5">
                    <Tab active={true} />
                    <Tab />
                    <Tab />
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