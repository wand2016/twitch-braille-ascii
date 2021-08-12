<template>
  <the-preview-canvas :image-data="imageDataRaw" :width="width" />
  <the-preview-canvas :image-data="imageDataFiltered" :width="width" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ThePreviewCanvas from "./ThePreviewCanvas.vue";

export default defineComponent({
  name: "ThePreview",
  components: { ThePreviewCanvas },
  props: {
    imageDataRaw: ImageData,
    imageDataFiltered: ImageData,
    width: {
      type: Number,
      default: 60,
    },
  },
});
</script>

<style scoped></style>
