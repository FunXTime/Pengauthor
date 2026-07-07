import { pack, unpack } from "msgpackr";
import { compressSync, decompressSync } from "fflate";

const BASE_DATE = Date.UTC(2026, 6, 1, 0, 0, 0, 0);

function encodeDate(date) {
  const time = typeof date === "number"
    ? date
    : new Date(date).getTime();
  return Math.floor((time - BASE_DATE) / 60000);
}

function decodeDate(minutes) {
  return new Date(BASE_DATE + minutes * 60000).toISOString();
}

function bytesToBase64Url(bytes) {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlToBytes(text) {
  const padded = text
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(text.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export function encodeNote(note) {
  const payload = [
    note.title ?? "",
    note.author ?? "",
    note.content ?? ""
  ];
  if (note.date != null) payload.push(encodeDate(note.date));
  const packed = pack(payload);
  const compressed = compressSync(packed, { level: 9 });
  return bytesToBase64Url(compressed);
}

export function decodeNote(hash) {
  if (!hash) {
    return {
      title: "",
      author: "",
      content: "",
      date: new Date().toISOString()
    };
  }
  try {
    const compressed = base64UrlToBytes(hash);
    const packed = decompressSync(compressed);
    const payload = unpack(packed);
    if (!Array.isArray(payload)) return null;
    const [
      title = "",
      author = "",
      content = "",
      minutes = null
    ] = payload;
    return {
      title,
      author,
      content,
      date: minutes == null
        ? new Date().toISOString()
        : decodeDate(minutes)
    };
  } catch {
    return null;
  }
}
