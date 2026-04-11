"use client";

import { useState } from "react";

export type DownloadTransformResult = {
  content: string;
  fileName: string;
  mimeType?: string;
};

export type DownloadTransform = (
  value: string,
) => DownloadTransformResult | Promise<DownloadTransformResult>;

const defaultFileName = "download.txt";
const defaultMimeType = "text/plain;charset=utf-8";

export function useDownload() {
  const [isDownloading, setIsDownloading] = useState(false);

  const download = async (input: string, transform?: DownloadTransform) => {
    setIsDownloading(true);
    try {
      const result = transform
        ? await transform(input)
        : { content: input, fileName: defaultFileName };
      const mimeType = result.mimeType ?? defaultMimeType;

      const blob = new Blob([result.content], { type: mimeType });
      const objectUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = result.fileName;
      a.click();

      setTimeout(() => URL.revokeObjectURL(objectUrl), 0);

      return result;
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    isDownloading,
    download,
  };
}
