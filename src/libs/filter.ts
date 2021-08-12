// eslint-disable-next-line @typescript-eslint/no-var-requires
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

export const applyTransparency = (bgWhiteness: number): ImageDataFilter => {
  return (imageData) => {
    const ret = cloneImageData(imageData);

    const d = ret.data;
    for (let i = 0; i < d.length; i += 4) {
      const transparency = 0xff - imageData.data[i + 3];

      d[i] = mixBG(d[i], bgWhiteness, transparency);
      d[i + 1] = mixBG(d[i + 1], bgWhiteness, transparency);
      d[i + 2] = mixBG(d[i + 2], bgWhiteness, transparency);

      // mark as opaque
      d[i + 3] = 0xff;
    }
    return ret;
  };
};
function mixBG(rgb: number, bgRgb: number, transparency: number): number {
  return Math.round(
    (rgb * (0xff - transparency) + bgRgb * transparency) / 0xff
  );
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
