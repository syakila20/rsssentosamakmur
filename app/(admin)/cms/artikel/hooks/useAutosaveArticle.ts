"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { autosaveArticleAction } from "@/modules/article/article.action";
import { UpdateArticlePayload } from "@/modules/article/type";

export type AutoSaveStatus = "idle" | "saving" | "saved" | "error";

type Props = {
  articleId: number;
  delay?: number;
};

export function useAutoSave({ articleId, delay = 4000 }: Props) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const latestPayload = useRef<Partial<UpdateArticlePayload>>({});

  const version = useRef(0);

  const [status, setStatus] = useState<AutoSaveStatus>("idle");

  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  /**
   * Cleanup timer ketika component unmount.
   */
  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const schedule = useCallback(
    (payload: Partial<UpdateArticlePayload>) => {
      console.log("XXAUTOSAVE", payload);
      /**
       * Merge payload sebelumnya.
       * Tidak overwrite.
       */
      latestPayload.current = {
        ...latestPayload.current,
        ...payload,
      };

      version.current += 1;

      const currentVersion = version.current;

      setStatus("idle");

      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(async () => {
        if (Object.keys(latestPayload.current).length === 0) {
          return;
        }

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
          setLastSaved(new Date());
        } catch {
          if (currentVersion !== version.current) {
            return;
          }

          setStatus("error");
        } finally {
          setTimeout(() => {
            setStatus("idle");
          }, 4000);
        }
      }, delay);
    },
    [articleId, delay],
  );

  const saveNow = useCallback(async () => {
    if (Object.keys(latestPayload.current).length === 0) {
      return;
    }

    /**
     * Hindari double request.
     */
    if (timer.current) {
      clearTimeout(timer.current);
    }

    version.current += 1;

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
      setLastSaved(new Date());
    } catch {
      if (currentVersion !== version.current) {
        return;
      }

      setStatus("error");
    }
  }, [articleId]);

  return {
    status,
    lastSaved,
    schedule,
    saveNow,
  };
}
