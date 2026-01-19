import Audioplayer from "@/components/home/audio-player";
import Getallpdf from "@/components/home/get-all-pdf";
import Getpdfbyid from "@/components/home/get-pdf-by-id";
import { Separator } from "@/components/ui/separator";
import { SidebarSeparator } from "@/components/ui/sidebar";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] gap-2 h-screen overflow-hidden">
        <Getallpdf />
        <Getpdfbyid />
        <Audioplayer />
    </div>
  );
}
