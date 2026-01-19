import Audioplayer from "@/components/home/audio-player";
import Getallpdf from "@/components/home/get-all-pdf";
import Getpdfbyid from "@/components/home/get-pdf-by-id";

export default function Dashboard() {
  return (
    <div className="h-screen rounded-l-md border bg-[#FAFAFA] shadow-md">
      <div className="grid h-full grid-cols-[1fr_2fr_1fr] gap-2">
          <Getallpdf />
          <Getpdfbyid />
          <Audioplayer />
      </div>
    </div>
  );
}
