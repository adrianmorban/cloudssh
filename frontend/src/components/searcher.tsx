import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from '@hugeicons/core-free-icons'

export const Searcher = () => {
    return (
        <div className="w-full">
            <div className="w-full h-10 flex gap-4 items-center border-border rounded-md overflow-hidden border bg-bg-secondary pl-4">
                <div className="h-full flex justify-center items-center">
                    <HugeiconsIcon icon={Search01Icon} size={16} color="white" strokeWidth={1} />
                </div>
                <input type="text" placeholder="Search or enter address" className="w-full h-full text-white outline-none text-sm" />
            </div>
        </div>
    );
}

export default Searcher;