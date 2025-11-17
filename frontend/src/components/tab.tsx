import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ComputerTerminal01Icon, Cancel01Icon } from '@hugeicons/core-free-icons'

type TabProps = {
    active?: boolean;
}

export const Tab: React.FC<TabProps> = ({ active }) => {
    return (
        <div className={`w-fit h-full rounded-md px-2 group cursor-pointer bg-bg-secondary border border-border ${active ? "" : "opacity-50 hover:opacity-100 transition-all duration-300"}`}>
            <div className="flex gap-2 items-center h-full">
                <HugeiconsIcon icon={ComputerTerminal01Icon} size={20} color="white" strokeWidth={1} />
                <span className="text-white text-sm">New tab</span>
                <button className="text-white cursor-pointer ml-2 group-hover:opacity-100 opacity-0 transition-all duration-300">
                    <HugeiconsIcon icon={Cancel01Icon} size={16} color="white" strokeWidth={1} />
                </button>
            </div>
        </div>
    );
}

export default Tab;