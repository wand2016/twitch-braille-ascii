console.log("Hello World!a");

// twitch chat width is 30-character-width.
// braille has 2 dots a character.
const WIDTH = 60;

function getCanvas(): HTMLCanvasElement {
  return document.querySelector("#canvas") as HTMLCanvasElement;
}

function computeResolution(image: HTMLImageElement) {
  return {
    width: WIDTH,
    height: Math.round((WIDTH * image.height) / image.width),
  };
}

async function putImageToCanvas(src: string, canvas: HTMLCanvasElement) {
  const image = await loadImage(src);

  const resolution = computeResolution(image);

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
  const src = URL.createObjectURL(this.files[0]);

  console.log(src);

  await putImageToCanvas(src, getCanvas());
}

// entrypoint
document.addEventListener("DOMContentLoaded", () => {
  const fileUpload = document.querySelector("#file-upload") as HTMLInputElement;
  fileUpload.addEventListener("change", onUpload);

  console.log("ready");
});
