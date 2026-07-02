"use client";

import { useCallback, useRef, useState } from "react";
import { autosaveArticleAction } from "@/modules/article/article.action";
import { UpdateArticlePayload } from "@/modules/article/type";
export type AutoSaveStatus = "idle" | "saving" | "saved" | "error";

type Props = {
  articleId: number;
  delay?: number;
};

export function useAutoSave({ articleId, delay = 2000 }: Props) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const latestPayload = useRef<Partial<UpdateArticlePayload> | null>(null);

  const version = useRef(0);

  const [status, setStatus] = useState<AutoSaveStatus>("idle");

  const scheduleSave = useCallback(
    (payload: Partial<UpdateArticlePayload>) => {
      latestPayload.current = payload;

      version.current += 1;

      const currentVersion = version.current;

      setStatus("idle");

      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(async () => {
        if (!latestPayload.current) {
          return;
        }

        try {
          setStatus("saving");

          const response = await autosaveArticleAction(
            articleId,
            latestPayload.current,
          );

          /**
           * response lama
           * jangan update status
           */
          if (currentVersion !== version.current) {
            return;
          }

          if (!response.success) {
            setStatus("error");

            return;
          }

          setStatus("saved");
        } catch {
          if (currentVersion !== version.current) {
            return;
          }

          setStatus("error");
        }
      }, delay);
    },
    [articleId, delay],
  );

  const saveNow = useCallback(async () => {
    if (!latestPayload.current) {
      return;
    }

    const currentVersion = version.current;

    try {
      setStatus("saving");

      const response = await autosaveArticleAction(
        articleId,
        latestPayload.current,
      );

      if (currentVersion !== version.current) {
        return;
      }

      if (!response.success) {
        setStatus("error");

        return;
      }

      setStatus("saved");
    } catch {
      if (currentVersion !== version.current) {
        return;
      }

      setStatus("error");
    }
  }, [articleId]);

  return {
    status,
    scheduleSave,
    saveNow,
  };
}
