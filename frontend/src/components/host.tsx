import { HugeiconsIcon } from "@hugeicons/react";
import { ServerStack03Icon, FolderShared03Icon, ComputerTerminal02Icon, Edit03Icon, Delete01Icon } from '@hugeicons/core-free-icons'

type HostProps = {
    name: string;
    user: string;
    address: string;
    lastConnected: string;
    favorite?: boolean;
}

export const Host = (props: HostProps) => {

    const actions = [
        { 
            icon: ComputerTerminal02Icon, 
            label: "Connect SSH",
            bg: "bg-green-600/20"
        },
        { 
            icon: FolderShared03Icon, 
            label: "Connect SFTP",
            bg: "bg-blue-600/20"
        },
        { 
            icon: Edit03Icon, 
            label: "Edit",
            bg: "bg-yellow-600/20"
        },
        { 
            icon: Delete01Icon, 
            label: "Delete",
            bg: "bg-red-600/20"
        }
    ]

    return (
        <div className="w-full rounded-md px-4 py-4 bg-bg-secondary border border-border cursor-pointer hover:bg-bg-secondary/70 transition-all duration-300 grid grid-cols-[auto_1fr_auto] gap-6">
            <div className="bg-primary-light/20 aspect-square rounded-md flex justify-center items-center border-primary/50 border">
                <HugeiconsIcon icon={ServerStack03Icon} size={24} color="white" strokeWidth={1} />
            </div>
            <div>
                <div className="w-full flex justify-between items-center">
                    <h2 className="text-white font-medium text-sm">{props.name}</h2>
                </div>
                <div className="w-full flex flex-col">
                    <span className="text-light text-sm opacity-70">{props.user}@{props.address}</span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                {actions.map((action, index) => (
                    <button key={index} className={`text-white opacity-20 hover:opacity-100 transition-opacity duration-300 p-4 ${action.bg} rounded-md cursor-pointer`} title={action.label}>
                        <HugeiconsIcon icon={action.icon} size={12} color="white" strokeWidth={1} />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Host;