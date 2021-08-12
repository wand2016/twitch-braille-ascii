import {
  getBG,
  getCanvasPreviewDithered,
  getCanvasPreviewRaw,
  getClipBoardButton,
  getFileSelect,
  getNega,
  getOutput,
} from "./libs/dom";
import { loadImageData } from "./libs/image";
import {
  composite,
  dither,
  identity,
  negate,
  applyTransparency,
} from "./libs/filter";
const { tenjify } = require("tenjify");

function putImageDataToCanvas(imageData: ImageData, canvas: HTMLCanvasElement) {
  canvas.width = imageData.width;
  canvas.height = imageData.height;

  canvas.getContext("2d")!.putImageData(imageData, 0, 0);
}

async function update() {
  const file = (getFileSelect().files ?? [])[0];
  if (!file) {
    console.warn("no file selected");
    return;
  }

  const imageData = await loadImageData(URL.createObjectURL(file));

  putImageDataToCanvas(imageData, getCanvasPreviewRaw());

  const filter = composite(
    getNega().checked ? negate : identity,
    applyTransparency(Number(getBG().value)),
    dither
  );

  const filteredImageData = filter(imageData);

  putImageDataToCanvas(filteredImageData, getCanvasPreviewDithered());
  getOutput().value = await tenjify(getCanvasPreviewDithered().toDataURL());
}

function copyToClipboard() {
  getOutput().select();
  document.execCommand("copy");
}

// entrypoint
document.addEventListener("DOMContentLoaded", () => {
  getFileSelect().addEventListener("change", update);
  getNega().addEventListener("change", update);
  getBG().addEventListener("change", update);
  getClipBoardButton().addEventListener("click", copyToClipboard);

  console.log("ready");
});
