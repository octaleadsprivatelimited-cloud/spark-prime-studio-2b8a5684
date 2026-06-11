export type CompressOptions = {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0..1
  mimeType?: "image/jpeg" | "image/webp" | "image/png";
};

/**
 * Client-side image compression. Reads a File, draws it onto a canvas
 * scaled to fit within maxWidth/maxHeight (preserving aspect ratio), and
 * returns a base64 data URL suitable for storing in Firestore.
 */
export async function compressImage(
  file: File,
  opts: CompressOptions = {}
): Promise<string> {
  const {
    maxWidth = 1280,
    maxHeight = 1280,
    quality = 0.78,
    mimeType = "image/jpeg",
  } = opts;

  if (!file.type.startsWith("image/")) {
    throw new Error("Selected file is not an image.");
  }

  const dataUrl = await readAsDataURL(file);
  const img = await loadImage(dataUrl);

  let { width, height } = img;
  const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
  width = Math.round(width * ratio);
  height = Math.round(height * ratio);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported.");
  // White background for JPEG (no transparency)
  if (mimeType === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(img, 0, 0, width, height);

  const out = canvas.toDataURL(mimeType, quality);
  // Firestore field cap is ~1MB. Base64 is ~33% larger than bytes.
  if (out.length > 950_000) {
    // Try harder: lower quality once.
    const retry = canvas.toDataURL(mimeType, Math.max(0.5, quality - 0.2));
    if (retry.length > 950_000) {
      throw new Error(
        "Image too large after compression. Please choose a smaller image."
      );
    }
    return retry;
  }
  return out;
}

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error ?? new Error("Read failed"));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}