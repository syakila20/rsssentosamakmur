"use client";

import { useEffect, useRef } from "react";

import { articleApi } from "@/lib/api/article/article.api";

function getSessionId() {
  let sessionId = sessionStorage.getItem("session_id");

  if (!sessionId) {
    sessionId = crypto.randomUUID();

    sessionStorage.setItem("session_id", sessionId);
  }

  return sessionId;
}

export default function TrackArticleView({ slug }: { slug: string }) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;

    const viewedKey = `viewed_${slug}`;

    if (sessionStorage.getItem(viewedKey)) return;

    hasTracked.current = true;

    const track = async () => {
      try {
        // ✅ hanya di client
        const sessionId = getSessionId();

        await articleApi.trackView(slug, sessionId);

        sessionStorage.setItem(viewedKey, "1");
      } catch (err) {
        console.error(err);
      }
    };

    track();
  }, [slug]);

  return null;
}
