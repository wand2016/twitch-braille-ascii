export function getFileSelect(): HTMLInputElement {
  return document.querySelector("#file-select") as HTMLInputElement;
}

export function getCanvasPreviewRaw(): HTMLCanvasElement {
  return document.querySelector("#preview-raw") as HTMLCanvasElement;
}

export function getCanvasPreviewDithered(): HTMLCanvasElement {
  return document.querySelector("#preview-dithered") as HTMLCanvasElement;
}

export function getOutput(): HTMLTextAreaElement {
  return document.querySelector("#output") as HTMLTextAreaElement;
}
