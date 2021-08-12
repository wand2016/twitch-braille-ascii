const floydSteinberg = require("floyd-steinberg");
const { tenjify } = require("tenjify");

// twitch chat width is 30-character-width.
// braille has 2 dots a character.
const WIDTH = 60;

type Resolution = {
  width: number;
  height: number;
};

function getCanvasPreviewRaw(): HTMLCanvasElement {
  return document.querySelector("#preview-raw") as HTMLCanvasElement;
}
function getCanvasPreviewDithered(): HTMLCanvasElement {
  return document.querySelector("#preview-dithered") as HTMLCanvasElement;
}

function computeResolution(image: HTMLImageElement): Resolution {
  return {
    width: WIDTH,
    height: Math.round((WIDTH * image.height) / image.width),
  };
}

async function putImageToCanvas(
  image: CanvasImageSource,
  canvas: HTMLCanvasElement,
  resolution: Resolution
) {
  canvas.width = resolution.width;
  canvas.height = resolution.height;

  canvas
    .getContext("2d")
    .drawImage(image, 0, 0, resolution.width, resolution.height);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolved, rejected) => {
    const image = document.createElement("img");

    image.addEventListener("load", () => {
      resolved(image);
    });

    image.addEventListener("error", (e) => {
      rejected(e);
    });

    image.src = src;
  });
}

async function onUpload(this: HTMLInputElement) {
  const image = await loadImage(URL.createObjectURL(this.files[0]));

  const resolution = computeResolution(image);
  await putImageToCanvas(image, getCanvasPreviewRaw(), resolution);

  const ditheredImageData: ImageData = floydSteinberg(
    getCanvasPreviewRaw()
      .getContext("2d")
      .getImageData(0, 0, resolution.width, resolution.height)
  );

  getCanvasPreviewDithered().width = resolution.width;
  getCanvasPreviewDithered().height = resolution.height;
  getCanvasPreviewDithered()
    .getContext("2d")
    .putImageData(ditheredImageData, 0, 0);

  document.querySelector("#output").innerHTML = await tenjify(
    getCanvasPreviewDithered().toDataURL()
  );
}

function copyToClipboard() {
  const output = document.querySelector("#output") as HTMLTextAreaElement;
  output.select();
  document.execCommand("copy");
}

// entrypoint
document.addEventListener("DOMContentLoaded", () => {
  const fileUpload = document.querySelector("#file-upload") as HTMLInputElement;
  fileUpload.addEventListener("change", onUpload);

  console.log("ready");
});
