"use client";

import { useState } from "react";

export type PreparedFile = {
  blob: Blob;
  fileName: string;
};

function triggerBrowserDownload(file: PreparedFile) {
  const objectUrl = URL.createObjectURL(file.blob);

  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = file.fileName;
  a.click();

  setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
}

export function useDownload() {
  const [isDownloading, setIsDownloading] = useState(false);

  const download = async (file: PreparedFile) => {
    setIsDownloading(true);

    try {
      triggerBrowserDownload(file);
      return file;
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    isDownloading,
    download,
  };
}
