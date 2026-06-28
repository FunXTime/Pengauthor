const loaded = new Set();
const loading = new Map();

function normalize(src) {
  if (!src) return null;
  return src.startsWith("/") ? src : `/${src}`;
}

export function preload(src) {
  src = normalize(src);
  if (!src) return Promise.resolve();
  if (loaded.has(src)) return Promise.resolve();
  if (loading.has(src)) return loading.get(src);

  const promise =
    new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        loaded.add(src);
        loading.delete(src);
        resolve();
      };
      image.onerror = (error) => {
        loading.delete(src);
        reject(error);
      };
      image.src = src;
    });
  loading.set(src, promise);
  return promise;
}

export function preloadMany(sources = []) {
  return Promise.all(sources.map(preload));
}

export function isPreloaded(src) {
  src = normalize(src);
  return loaded.has(src);
}

export default preload;
