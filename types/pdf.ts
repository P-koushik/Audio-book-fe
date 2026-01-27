export type PdfStatus = "uploaded" | "processing" | "completed" | "failed" | (string & {});

export type PdfUserRef =
  | string
  | {
      _id?: string;
      name?: string;
    };

export type Pdf = {
  _id: string;
  userId: PdfUserRef;
  filename: string;
  originalPdfUrl: string;
  status: PdfStatus;
  audioUrl?: string;
  pageCount?: number;
  textChunkCount?: number;
  textExtractedAt?: string;
  textExtractionError?: string;
  textChunks?: PdfTextChunk[];
  createdAt?: string;
  updatedAt?: string;
};

export type PdfTextChunk = {
  pageNumber: number;
  chunkIndex: number;
  text: string;
  charCount: number;
};

export type ApiResponse<T> = {
  message?: string;
  data: T;
  [key: string]: unknown;
};
