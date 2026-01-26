import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileText, Upload, X } from "lucide-react";
import { useState } from "react";
import { useUploadPdf } from "@/hooks/api/pdfs";
import { usePanel } from "@/components/ui/panel";
import { toast } from "sonner";

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const uploadPdfMutation = useUploadPdf();
  const { closePanel } = usePanel();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      await uploadPdfMutation.mutateAsync({ file: selectedFile });
      toast.success("PDF uploaded successfully");
      setSelectedFile(null);
      closePanel();
    } catch {
      // Error is handled by the hook
    }
  };

  return (
    <div className="sm:mx-auto sm:max-w-lg flex items-center justify-center w-full max-w-lg">
      <form onSubmit={handleSubmit}>
        <div className="mt-4 flex justify-center space-x-4 rounded-md border border-dashed border-input px-6 py-10">
          <div className="sm:flex sm:items-center sm:gap-x-3">
            <Upload
              className="mx-auto h-8 w-8 text-muted-foreground sm:mx-0 sm:h-6 sm:w-6"
              aria-hidden={true}
            />
            <div className="mt-4 flex text-sm leading-6 text-foreground sm:mt-0">
              <p>Drag and drop or</p>
              <Label
                htmlFor="file-upload-4"
                className="relative cursor-pointer rounded-sm pl-1 font-medium text-primary hover:underline hover:underline-offset-4"
              >
                <span>choose file</span>
                <input
                  id="file-upload-4"
                  name="file-upload-4"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </Label>
              <p className="pl-1">to upload</p>
            </div>
          </div>
        </div>
        <p className="mt-2 flex items-center justify-between text-xs leading-5 text-muted-foreground">
          Recommended max. size: 10 MB, Accepted file types: PDF.
        </p>
        {selectedFile && (
          <div className="relative mt-8 rounded-lg bg-muted p-3">
            <div className="absolute right-1 top-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-sm p-2 text-muted-foreground hover:text-foreground"
                aria-label="Remove"
                onClick={() => setSelectedFile(null)}
              >
                <X className="size-4 shrink-0" aria-hidden={true} />
              </Button>
            </div>
            <div className="flex items-center space-x-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-background shadow-sm ring-1 ring-inset ring-input">
                <FileText
                  className="size-5 text-foreground"
                  aria-hidden={true}
                />
              </span>
              <div className="w-full">
                <p className="text-xs font-medium text-foreground">
                  {selectedFile.name}
                </p>
                <p className="mt-0.5 flex justify-between text-xs text-muted-foreground">
                  <span>{(selectedFile.size / 1024 / 1024).toFixed(1)} MB</span>
                  <span>Ready to upload</span>
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="mt-8 flex items-center justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            className="whitespace-nowrap rounded-sm border border-input px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-accent hover:text-foreground"
            onClick={() => setSelectedFile(null)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            disabled={!selectedFile || uploadPdfMutation.isPending}
            className="whitespace-nowrap rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            {uploadPdfMutation.isPending ? "Uploading..." : "Upload"}
          </Button>
        </div>
        {uploadPdfMutation.isError && (
          <p className="mt-4 text-sm text-red-500">Upload failed</p>
        )}
      </form>
    </div>
  );
}
