import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Home01Icon, ServerStack02Icon, Key01Icon, FingerPrintIcon, Settings01Icon, SidebarLeftIcon } from '@hugeicons/core-free-icons';
import SidebarItem from "../components/sidebarItem";
import { useRouterState } from "@tanstack/react-router";

export const Sidebar: React.FC = () => {

    const pathname = useRouterState({
        select: state => state.location.pathname
    })

    const [status, setStatus] = useState<"open" | "closed" | "collapsed">("open");

    const statusClasses = {
        open: "w-[350px]",
        closed: "w-0",
        collapsed: "w-[80px]"
    }

    const items = [
        {
            name: "Home",
            icon: Home01Icon,
            route: "/"
        },
        {
            name: "Hosts",
            icon: ServerStack02Icon,
            route: "/hosts"
        },
        {
            name: "Keys",
            icon: Key01Icon,
            route: "/keys"
        },
        {
            name: "Known Hosts",
            icon: FingerPrintIcon,
            route: "/known-hosts"
        },
        {
            name: "Settings",
            icon: Settings01Icon,
            route: "/settings"
        }
    ]

    const changeStatus = () => {
        if(status === "open") {
            setStatus("collapsed");
        }
        else {
            setStatus("open");
        }
    }

    return (
        <aside className={`${statusClasses[status]} h-full bg-bg-secondary border-border/50 border-r transition-all duration-500`}>
            <div className="w-full h-12 bg-bg-secondary flex items-center justify-between border-border/50 border-b px-4" style={{ WebkitAppRegion: "drag" } as React.CSSProperties}>
                <div className={`${status === "collapsed" ? "w-0" : "w-auto"} overflow-hidden`}>
                    <h1 className="text-white">CloudSSH</h1>
                </div>
                <button onClick={ () => changeStatus() } className="flex items-center justify-center cursor-pointer">
                    <HugeiconsIcon icon={SidebarLeftIcon} size={20} color="white" strokeWidth={1} />
                </button>
            </div>
            <div className={`${status === "collapsed" ? "px-2" : "px-4"} flex flex-col py-4 transition-all duration-1000 h-[calc(100%-48px)]`}>
                {items.map((item, index) => (
                    <SidebarItem key={item.route} title={item.name} icon={item.icon} route={item.route} status={status} active={pathname === item.route} className={`${index === items.length - 1 ? "mt-auto" : ""}`} />
                ))}
            </div>
        </aside>
    );
}