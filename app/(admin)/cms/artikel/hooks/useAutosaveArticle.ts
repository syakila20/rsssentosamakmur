"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { autosaveArticleAction } from "@/modules/article/article.action";
import { UpdateArticlePayload } from "@/modules/article/type";

export type AutoSaveStatus = "idle" | "saving" | "saved" | "error";

type Props = {
  articleId: number;
  delay?: number;
};

const SUCCESS_DURATION = 3000;

export function useAutoSave({ articleId, delay = 4000 }: Props) {
  /**
   * debounce autosave
   */
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * timer untuk menghilangkan status "saved"
   */
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * payload terakhir yang belum tersimpan
   */
  const latestPayload = useRef<Partial<UpdateArticlePayload>>({});

  /**
   * race condition protection
   */
  const version = useRef(0);
  const [status, setStatus] = useState<AutoSaveStatus>("idle");
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    return () => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }

      if (statusTimer.current) {
        clearTimeout(statusTimer.current);
      }
    };
  }, []);

  const showSavedState = () => {
    if (statusTimer.current) {
      clearTimeout(statusTimer.current);
    }

    statusTimer.current = setTimeout(() => {
      setStatus("idle");
    }, SUCCESS_DURATION);
  };

  const resetAfterSuccess = () => {
    latestPayload.current = {};
    setStatus("saved");
    setIsDirty(false);
    setLastSaved(new Date());
    showSavedState();
  };

  const executeSave = useCallback(
    async (currentVersion: number) => {
      if (Object.keys(latestPayload.current).length === 0) {
        return;
      }

      try {
        setStatus("saving");

        const response = await autosaveArticleAction(
          articleId,
          latestPayload.current,
        );

        /**
         * abaikan response lama
         */
        if (currentVersion !== version.current) {
          return;
        }

        if (!response.success) {
          setStatus("error");
          return;
        }

        resetAfterSuccess();
      } catch {
        if (currentVersion !== version.current) {
          return;
        }

        /**
         * tetap dirty karena belum berhasil save
         */
        setStatus("error");
      }
    },
    [articleId],
  );

  const schedule = useCallback(
    (payload: Partial<UpdateArticlePayload>) => {
      latestPayload.current = {
        ...latestPayload.current,
        ...payload,
      };

      setIsDirty(true);

      version.current += 1;

      const currentVersion = version.current;

      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }

      setStatus("idle");

      saveTimer.current = setTimeout(() => {
        executeSave(currentVersion);
      }, delay);
    },
    [delay, executeSave],
  );

  const saveNow = useCallback(async () => {
    if (Object.keys(latestPayload.current).length === 0) {
      return;
    }

    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }

    version.current += 1;

    const currentVersion = version.current;

    await executeSave(currentVersion);
  }, [executeSave]);

  return {
    status,
    isDirty,
    lastSaved,
    schedule,
    saveNow,
  };
}
