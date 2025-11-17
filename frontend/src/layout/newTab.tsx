 import React from "react";
 import Searcher from "../components/searcher";
// import { MinusIcon, SquareIcon, XIcon } from "lucide-react";
// import { HugeiconsIcon } from "@hugeicons/react";
// import { SidebarLeftIcon } from '@hugeicons/core-free-icons'
// import Tab from "../components/tab";
import { Host } from "../components/host";

export const NewTab: React.FC = () => {

    //         name: string;
    // user: string;
    // address: string;
    // lastConnected: string;
    // favorite?: boolean;
    const fakeHosts = [
        {
            name: "My Server",
            user: "adrian",
            address: "192.168.1.1",
            lastConnected: "2024-06-01",
            favorite: true
        },
        {
            name: "Work Laptop",
            user: "adrian.work",
            address: "work.example.com",
            lastConnected: "2024-05-28",
        },
        {
            name: "Test VM",
            user: "test.user",
            address: "test.vm.local",
            lastConnected: "2024-06-02",
        },
        {
            name: "Old Server",
            user: "old.admin",
            address: "old.server.net",
            lastConnected: "2023-12-15",
            favorite: false
        }
    ]

    return (
        <div className="w-full flex flex-col items-center py-10">
            <div className="w-full h-full flex justify-center items-center">
                <Searcher />
            </div>
            <div className="w-full grid grid-cols-1 gap-4 mt-5">
                {fakeHosts.map((host, index) => (
                    <Host
                        key={index}
                        name={host.name}
                        user={host.user}
                        address={host.address}
                        lastConnected={host.lastConnected}
                        favorite={host.favorite}
                    />
                ))}
            </div>
        </div>
    );
}