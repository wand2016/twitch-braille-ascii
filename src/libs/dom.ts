export function getFileSelect(): HTMLInputElement {
  return document.querySelector("#file-select") as HTMLInputElement;
}

export function getNega(): HTMLInputElement {
  return document.querySelector("#nega") as HTMLInputElement;
}

export function getBG(): HTMLInputElement {
  return document.querySelector("#bg") as HTMLInputElement;
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

export function getClipBoardButton(): HTMLButtonElement {
  return document.querySelector("#copy-to-clipboard") as HTMLButtonElement;
}
