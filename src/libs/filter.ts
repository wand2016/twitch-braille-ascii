const floydSteinberg = require("floyd-steinberg");

export type ImageDataFilter = {
  (imageData: ImageData): ImageData;
};

function cloneImageData(imageData: ImageData): ImageData {
  const ret = new ImageData(imageData.width, imageData.height);
  ret.data.set(new Uint8ClampedArray(imageData.data));
  return ret;
}

export const identity: ImageDataFilter = (imageData) => imageData;

export const dither: ImageDataFilter = (imageData) => {
  return floydSteinberg(imageData);
};

export const transparentToWhite: ImageDataFilter = (imageData) => {
  const ret = cloneImageData(imageData);

  const d = ret.data;
  for (let i = 0; i < d.length; i += 4) {
    if (imageData.data[i + 3] === 0) {
      d[i] = 255;
      d[i + 1] = 255;
      d[i + 2] = 255;
      d[i + 3] = 255;
    }
  }

  return ret;
};

export const negate: ImageDataFilter = (imageData) => {
  const ret = cloneImageData(imageData);
  const d = ret.data;
  for (let i = 0; i < d.length; ++i) {
    // skip alpha
    if (i % 4 === 3) {
      continue;
    }
    d[i] = 0xff - d[i];
  }
  return ret;
};

export function composite(
  ...imageDataFilters: ImageDataFilter[]
): ImageDataFilter {
  return (imageData: ImageData) => {
    let ret = imageData;
    for (const imageDataFilter of imageDataFilters) {
      ret = imageDataFilter(ret);
    }

    return ret;
  };
}
