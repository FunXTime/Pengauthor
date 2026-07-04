"use client";

import { useEffect } from "react";
import { pingCPArmies, pingNetwork } from "@/lib/ping";
import { showToast, dismissToast } from "@/components/Toast";

export default function Ping() {
  useEffect(() => {
    let networkFailures = 0;
    let cpaFailures = 0;
    async function check() {
      const networkOk = await pingNetwork();
      if (!networkOk) networkFailures++;
      else {
        networkFailures = 0;
        dismissToast("network");
      }
      if (networkFailures >= 3) {
        showToast({
          key: "network",
          type: "warning",
          title: "Possible network issue",
          description: "Pengauthor is having trouble reaching the internet.",
          duration: 0
        });
        dismissToast("cparmies");
        return;
      }
      const cpaOk = await pingCPArmies();
      if (!cpaOk) {
        cpaFailures++;
      } else {
        cpaFailures = 0;
        dismissToast("cparmies");
      }
      if (cpaFailures >= 3) {
        showToast({
          key: "cparmies",
          type: "warning",
          title: "CP Armies is unreachable",
          description: "cparmies.org could not be reached. Some features may be unavailable.",
          duration: 0
        });
      }
    }
    check();
    const interval = setInterval(check, 5000);
    return () => clearInterval(interval);
  }, []);

  return null;
}
