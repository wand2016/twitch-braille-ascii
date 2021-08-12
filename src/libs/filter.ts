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

export const transparencyToWhiteness: ImageDataFilter = (imageData) => {
  const ret = cloneImageData(imageData);

  const d = ret.data;
  for (let i = 0; i < d.length; i += 4) {
    // use transparency as whiteness
    const whiteness = 0xff - imageData.data[i + 3];

    // and mix white
    d[i] = mixWhite(d[i], whiteness);
    d[i + 1] = mixWhite(d[i + 1], whiteness);
    d[i + 2] = mixWhite(d[i + 2], whiteness);

    // and mark as opaque
    d[i + 3] = 0xff;
  }
  return ret;
};

function mixWhite(rgb: number, whiteness: number): number {
  return Math.round((rgb * (0xff - whiteness) + 0xff * whiteness) / 0xff);
}

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
