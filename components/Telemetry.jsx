"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Telemetry() {
  return (
    <>
      <Analytics
        beforeSend={(event) => {
          const url = new URL(event.url);
          const isHashedNote = /\/note\/.{5,}/.test(url.pathname);
          if (
            isHashedNote
            && url.pathname !== "/note/H4sIANIwSmoCAw3FwQmAMAwF0FW-1yLu4cGz50oDCUIiaaR0DhfoWm6jp_eM8a4p7S5ByFD7YXKaEUyKytkJEmgSjKz9sNKnlLBlP4s1hVTU-7rMg8ryAfNjCnxOAAAA"
          ) return null;
          return event;
        }}
      />
      <SpeedInsights />
    </>
  );
}
