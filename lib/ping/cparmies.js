const URL = "https://cparmies.org";

export async function pingCPArmies(timeout = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() =>
    controller.abort(),
  timeout);

  try {
    console.log(await fetch(URL, {
      method: "HEAD",
      mode: "no-cors",
      signal: controller.signal
    }));
    clearTimeout(timer);
    return true;
  } catch {
    clearTimeout(timer);
    return false;
  }
}
