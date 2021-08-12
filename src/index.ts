import {
  getCanvasPreviewDithered,
  getCanvasPreviewRaw,
  getClipBoardButton,
  getFileSelect,
  getNega,
  getOutput,
} from "./libs/dom";
import { loadImageData, negateImageData } from "./libs/image";
const floydSteinberg = require("floyd-steinberg");
const { tenjify } = require("tenjify");

function putImageDataToCanvas(imageData: ImageData, canvas: HTMLCanvasElement) {
  canvas.width = imageData.width;
  canvas.height = imageData.height;

  canvas.getContext("2d").putImageData(imageData, 0, 0);
}

async function update() {
  const file = getFileSelect().files[0];
  if (!file) {
    console.warn("no file selected");
    return;
  }

  const imageData = await loadImageData(URL.createObjectURL(file));

  putImageDataToCanvas(imageData, getCanvasPreviewRaw());

  const ditheredImageData: ImageData = floydSteinberg(imageData);
  if (getNega().checked) {
    negateImageData(ditheredImageData);
  }

  putImageDataToCanvas(ditheredImageData, getCanvasPreviewDithered());

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
  getClipBoardButton().addEventListener("click", copyToClipboard);

  console.log("ready");
});
