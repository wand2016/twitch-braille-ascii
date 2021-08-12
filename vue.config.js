module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/twitch-braille-ascii/public/"
      : "/",
  pages: {
    index: {
      // entry for the page
      entry: "src/main.ts",
      // the source template
      template: "template/index.html",
      // output as dist/index.html
      filename: "index.html",
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
};
