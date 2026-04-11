"use client";

import { useEffect, useRef, useState } from "react";

export type UseCopyProps = {
  copiedDurationMs?: number;
};

export type CopyTransform = (value: string) => string | Promise<string>;

const defaultCopiedMs = 2000;

export function useCopy({
  copiedDurationMs = defaultCopiedMs,
}: UseCopyProps = {}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = async (input: string, transform?: CopyTransform) => {
    const prepared = transform ? await transform(input) : input;
    await navigator.clipboard.writeText(prepared);

    setCopied(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), copiedDurationMs);

    return prepared;
  };

  return { copied, copy };
}
