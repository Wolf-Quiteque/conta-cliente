type ImageSource = {
  source: CanvasImageSource;
  width: number;
  height: number;
  cleanup: () => void;
};

async function loadImageSource(file: File): Promise<ImageSource> {
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(file);
      return {
        source: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        cleanup: () => bitmap.close(),
      };
    } catch {
      // Some browsers fail on certain HEIC/EXIF variants — fall back to <img>.
    }
  }

  const url = URL.createObjectURL(file);
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Não foi possível ler a imagem."));
    img.src = url;
  });

  return {
    source: img,
    width: img.naturalWidth,
    height: img.naturalHeight,
    cleanup: () => URL.revokeObjectURL(url),
  };
}

/**
 * Resizes (longest edge capped) and re-encodes a photo as WebP in the browser,
 * so large camera captures never hit the network at full size.
 */
export async function fileToWebp(
  file: File,
  {
    maxDimension = 1600,
    quality = 0.82,
  }: { maxDimension?: number; quality?: number } = {},
): Promise<File> {
  const { source, width: srcWidth, height: srcHeight, cleanup } =
    await loadImageSource(file);

  let width = srcWidth;
  let height = srcHeight;
  if (width > maxDimension || height > maxDimension) {
    const scale = maxDimension / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width || 1;
  canvas.height = height || 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    cleanup();
    throw new Error("Não foi possível processar a imagem.");
  }
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  cleanup();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) =>
        b ? resolve(b) : reject(new Error("Falha ao converter a imagem.")),
      "image/webp",
      quality,
    );
  });

  const baseName = file.name.replace(/\.[^.]+$/, "") || "recibo";
  return new File([blob], `${baseName}.webp`, { type: "image/webp" });
}
