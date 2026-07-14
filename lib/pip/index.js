import { createRoot } from "react-dom/client";

let pipWindow = null;
let root = null;

export async function openPiP(Component, {
  width = 256,
  height = 256,
  title = document.title,
  props = {}
} = {}) {
  if (!("documentPictureInPicture" in window)) {
    throw new Error("Document Picture-in-Picture is not supported.");
  }
  if (pipWindow && !pipWindow.closed) {
    pipWindow.focus();
    root.render(<Component {...props} />);
    return pipWindow;
  }
  pipWindow = await window.documentPictureInPicture.requestWindow({
    width,
    height
  });
  pipWindow.document.title = title;

  for (const node of document.head.querySelectorAll(
    'style, link[rel="stylesheet"]'
  )) pipWindow.document.head.appendChild(node.cloneNode(true));

  const container = pipWindow.document.createElement("div");
  container.id = "pip-root";
  container.style.height = "100vh";
  pipWindow.document.body.style.margin = "0";
  pipWindow.document.body.appendChild(container);
  root = createRoot(container);
  root.render(<Component {...props} />);

  pipWindow.addEventListener("pagehide", () => {
    root.unmount();
    root = null;
    pipWindow = null;
  });

  return pipWindow;
}

export function updatePiP(Component, props = {}) {
  if (!root) return;
  root.render(<Component {...props} />);
}

export function closePiP() {
  if (!pipWindow) return;
  pipWindow.close();
  root = null;
  pipWindow = null;
}

export function isPiPOpen() {
  return !!pipWindow && !pipWindow.closed;
}
