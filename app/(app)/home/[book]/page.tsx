import { SearchInput } from "@/components/search-input";

export default function DetailsPage() {
    return (
        <div className="flex h-full min-w-0 flex-col overflow-hidden rounded-md border shadow-md">
            <div className="grid min-h-0 min-w-0 flex-1 grid-cols-[3fr_1fr]">
                <div className="flex min-h-0 min-w-0 flex-col">
                    <div className="shrink-0 p-2">
                        <SearchInput />
                    </div>
                    <div className="mx-2 flex-1 min-h-0 overflow-auto rounded-t-md border bg-blue-200">
                        this is for the pdf display
                    </div>
                </div>
                <div className="min-h-0 min-w-0 overflow-auto">
                    this is for the audio area
                </div>
            </div>
        </div>
    )
}
