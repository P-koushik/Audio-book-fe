"use client";


import { useParams } from "next/navigation";
import { SearchInput } from "@/components/search-input";
import { Play, Pause, RotateCcw, RotateCw } from "lucide-react";
import { useGetPdfById } from "@/hooks/api/pdfs";
import Image from "next/image";
import { useState } from "react";
import { Streamdown } from "streamdown";

export default function DetailsPage() {
  const [clicked, setclicked] = useState(false);
  const params = useParams();
  const id = params._id as string;
  const [pdfText, loading, error] = useGetPdfById(id);

  return (
    <div className="flex h-full min-w-0 flex-col overflow-hidden">
      {/* Added gap-4 here instead of margins on children */}
      <div className="grid min-h-0 min-w-0 flex-1 grid-cols-[3fr_1fr]">
        {/* Left Column: Search & PDF */}
        <div className="flex min-h-0 min-w-0 flex-col">
          <div className="shrink-0 px-2 pb-2">
            <SearchInput />
          </div>
          <div className="mx-2 min-h-0 flex-1 overflow-auto rounded-md border border-slate-200 bg-slate-50 shadow-md">
            {loading ? (
              <div className="flex h-full items-center justify-center text-slate-400">
                Loading PDF…
              </div>
            ) : error ? (
              <div className="text-destructive flex h-full items-center justify-center text-sm">
                Failed to load PDF.
              </div>
            ) : !pdfText?.text ? (
              <div className="flex h-full items-center justify-center text-slate-400">
                No text found yet.
              </div>
            ) : (
              <div className="p-4">
                <div className="rounded-md border border-slate-200 bg-white">
                  <div className="p-3">
                    <Streamdown>
                      {pdfText.text}
                    </Streamdown>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Player & Controls */}
        {/* Removed ml-2 mr-2. Added max-w-full to prevent blowout */}
        <div className="grid min-h-0 min-w-0 grid-rows-[7fr_1fr] overflow-hidden rounded-md border border-slate-200 shadow-md">
          {/* Top Row: Image Card */}
          <div className="flex items-center justify-center bg-slate-50 p-6">
            <div className="relative w-auto max-w-full overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5">
              <img
                src="https://placehold.co/400x600/e2e8f0/475569?text=Cover+Art"
                alt="Book Cover"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Bottom Row: Audio Controls */}
          {/* Fixed px- typo to px-6 */}
          <div className="flex flex-col justify-center gap-3 border-t border-slate-100 bg-white px-6 py-2">
            {/* Timeline Slider */}
            <div className="flex w-full items-center gap-3 text-xs font-medium text-slate-500">
              <span>01:20</span>
              <div className="group relative h-1.5 flex-1 cursor-pointer rounded-full bg-slate-200">
                <div className="absolute h-full w-1/3 rounded-full bg-slate-900 transition-colors group-hover:bg-blue-600"></div>
              </div>
              <span>04:45</span>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-6">
              <button className="text-slate-500 transition-colors hover:text-slate-800">
                <RotateCcw size={20} />
              </button>

              <button
                className="flex size-12 items-center justify-center rounded-full bg-slate-900 text-white shadow transition-all hover:scale-105 hover:bg-slate-800"
                onClick={() => setclicked(!clicked)}
              >
                {clicked ? <Pause /> : <Play />}
              </button>

              <button className="text-slate-500 transition-colors hover:text-slate-800">
                <RotateCw size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
