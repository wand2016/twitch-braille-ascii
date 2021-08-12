async function loadImageAsImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolved, rejected) => {
    const image = new Image();

    image.addEventListener("load", () => {
      resolved(image);
    });

    image.addEventListener("error", (e) => {
      rejected(e);
    });

    image.src = src;
  });
}

export async function loadImageData(
  src: string,
  width = 60
): Promise<ImageData> {
  const imageElement = await loadImageAsImageElement(src);

  const resolution = {
    width,
    height: Math.round((width * imageElement.height) / imageElement.width),
  };

  const tmpCanvas = document.createElement("canvas");
  tmpCanvas.width = resolution.width;
  tmpCanvas.height = resolution.height;

  const ctx = tmpCanvas.getContext("2d");
  if (!ctx) {
    throw new Error("canvas context is null");
  }

  ctx.drawImage(imageElement, 0, 0, resolution.width, resolution.height);
  return ctx.getImageData(0, 0, resolution.width, resolution.height);
}

export function imageDataToDataUrl(imageData: ImageData): string {
  const tmpCanvas = document.createElement("canvas");
  tmpCanvas.width = imageData.width;
  tmpCanvas.height = imageData.height;

  const ctx = tmpCanvas.getContext("2d");
  if (!ctx) {
    throw new Error("canvas context is null");
  }
  ctx.putImageData(imageData, 0, 0);

  return tmpCanvas.toDataURL();
}
