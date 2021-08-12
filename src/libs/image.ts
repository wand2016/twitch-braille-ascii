async function loadImageAsImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolved, rejected) => {
    const imageElement = document.createElement("img");

    imageElement.addEventListener("load", () => {
      resolved(imageElement);
    });

    imageElement.addEventListener("error", (e) => {
      rejected(e);
    });

    imageElement.src = src;
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

  ctx.drawImage(imageElement, 0, 0, resolution.width, resolution.height);
  return ctx.getImageData(0, 0, resolution.width, resolution.height);
}

export function imageDataToDataUrl(imageData: ImageData): string {
  const tmpCanvas = document.createElement("canvas");
  tmpCanvas.width = imageData.width;
  tmpCanvas.height = imageData.height;

  return tmpCanvas.toDataURL();
}

export function negateImageData(imageData: ImageData) {
  const d = imageData.data;
  for (let i = 0; i < d.length; ++i) {
    // skip alpha
    if (i % 4 === 3) {
      continue;
    }
    d[i] = 255 - d[i];
  }
}
