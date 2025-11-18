import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react';
import { Link } from '@tanstack/react-router'
// import link from tanstack react router when routing is implemented}

type SidebarItemProps = {
    title: string;
    icon: IconSvgElement;
    route: string;
    status: "open" | "closed" | "collapsed";
    active?: boolean;
    className?: string;
}

const SidebarItem = ({ title, icon, route, status, active, className = '' }: SidebarItemProps) => {
    return (
        <Link to={route} className={`block w-full ${className}`}>
            <div className={`flex items-center ${status === "collapsed" ? "px-0 justify-center" : "px-4 gap-3"} py-3 cursor-pointer rounded-lg ${active ? "bg-bg-tertiary" : ""}`}>
                <HugeiconsIcon icon={icon} size={24} className='text-light' strokeWidth={1} />
                <div className={`${status === "collapsed" ? "w-0" : "w-auto"} overflow-hidden transition-all duration-300`}>
                    <span className="text-light text-nowrap">{title}</span>
                </div>
            </div>
        </Link>
    );
}

export default SidebarItem;