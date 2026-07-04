const URL = "/heartbeat";

export async function pingNetwork(timeout = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() =>
    controller.abort(),
  timeout);

  try {
    await fetch(URL, {
      method: "HEAD",
      signal: controller.signal
    });
    clearTimeout(timer);
    return true;
  } catch {
    clearTimeout(timer);
    return false;
  }
}
