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
            && url.pathname !== "/note/H4sIABThZWoCAzWQPU7EMBCFRetTvG1TRFp-DkABNeJHiHI2no2tdezInmgJ1-ACW3AqTsPYEZXt8Zs337zvy-X36qfr3rMXBiEmPRxnhiQUR3o5e3EQx3jmOWXxccQr07TrOnykBQNFLEX1zhew9ZIyqKhVmWloNj4WzgLhT0E6guKKwHEU1xuz77GNnlORqpS8DOJTLFCfQHlUAApBn8fN4aj1CqYc5rrHvbUIPp5KnTQvh-CLY9vsWumw-GAxqJOX1dz0eFPWifLJpnOsAo7ZD06pLIqswX8x1rTkloS57fGUuRQ87pHi9nHi9ZAo20aiaBjSNGl7MXc9XlpkBEcNoyqUVmPjqM8K2hapWbUB5iHTf3htPY7iM4e1AY0sCkXabXd_ZdA1t6oBAAA"
          ) return null;
          return event;
        }}
      />
      <SpeedInsights />
    </>
  );
}
