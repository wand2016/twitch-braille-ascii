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
