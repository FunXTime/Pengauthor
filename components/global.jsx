"use client";

import { useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { hideToast, showToast, Toast } from "./Toast";

export function GlobalShortcuts() {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== "F1") return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (
          target.closest(".monaco-editor") ||
          target.matches("input, textarea, [contenteditable='true']")
        )
      ) return;
      event.preventDefault();
      window.open("https://cparmies.org/reporting-guide", "_blank", "noopener,noreferrer");
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return null;
}

export function Telemetry() {
  return (
    <>
      <Analytics
        beforeSend={(event) => {
          const url = new URL(event.url);
          const isHashedNote = /\/note\/.{5,}/.test(url.pathname);
          if (
            isHashedNote
            && url.pathname !== "/note/H4sIABThZWoCAzWQPU7EMBCFRetTvG1TRFp-DkABNeJHiHI2no2tdezInmgJ1-ACW3AqTsPYEZXt8Zs337zvy-X36qfr3rMXBiEmPRxnhiQUR3o5e3EQx3jmOWXxccQr07TrOnykBQNFLEX1zhew9ZIyqKhVmWloNj4WzgLhT0E6guKKwHEU1xuz77GNnlORqpS8DOJTLFCfQHlUAApBn8fN4aj1CqYc5rrHvbUIPp5KnTQvh-CLY9vsWumw-GAxqJOX1dz0eFPWifLJpnOsAo7ZD06pLIqswX8x1rTkloS57fGUuRQ87pHi9nHi9ZAo20aiaBjSNGl7MXc9XlpkBEcNoyqUVmPjqM8K2hapWbUB5iHTf3htPY7iM4e1AY0sCkXabXd_ZdA1t6oBAAA"
          ) return null;
          return event;
        }}
      />
      <SpeedInsights />
    </>
  );
}

export function Ping() {
  const reachable = useRef(true);
  useEffect(() => {
    async function ping() {
      try {
        const response = await fetch("/heartbeat", {
          method: "GET",
          cache: "no-store"
        });
        if (!response.ok) throw new Error();
        if (!reachable.current) hideToast();
        reachable.current = true;
      } catch {
        if (reachable.current) {
          showToast(
            "Your network connection seems unstable!",
            "WARNING"
          );
          reachable.current = false;
        }
      }
    }
    ping();
    const interval = setInterval(ping, 5000);
    return () => clearInterval(interval);
  }, []);

  return null;
}

export function GlobalToast() {
  return (
    <Toast />
  )
}
