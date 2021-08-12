<template>
  <h1>twitchの点字アスキーアートを作るやつ</h1>

  <the-input
    v-model:nega="input.nega"
    v-model:bg.number="input.bg"
    v-model:imageUrl="input.imageUrl"
  />
  <the-preview
    :image-data-raw="preview.imageDataRaw"
    :image-data-filtered="preview.imageDataFiltered"
  />
  <hr />
  <the-output :model-value="output" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import TheOutput from "@/components/TheOutput.vue";
import ThePreview from "@/components/ThePreview.vue";
import TheInput from "@/components/TheInput.vue";
import { loadImageData, imageDataToDataUrl } from "@/libs/image";
import {
  composite,
  dither,
  identity,
  negate,
  applyTransparency,
} from "@/libs/filter";
import { tenjify } from "tenjify";

type Input = {
  nega: boolean;
  bg: number;
  imageUrl: string | null;
};
type Preview = {
  imageDataRaw: ImageData | null;
  imageDataFiltered: ImageData | null;
};

export default defineComponent({
  name: "App",
  components: { TheInput, ThePreview, TheOutput },
  setup() {
    const input: Input = reactive({
      nega: false,
      bg: 0xff,
      imageUrl: null,
    });

    const preview: Preview = reactive({
      imageDataRaw: null,
      imageDataFiltered: null,
    });

    const output = ref("");

    watch(
      () => input,
      async () => {
        if (input.imageUrl) {
          const imageDataRaw = await loadImageData(input.imageUrl, 60);

          const filter = composite(
            input.nega ? negate : identity,
            applyTransparency(input.bg),
            dither
          );
          const imageDataFiltered = filter(imageDataRaw);

          preview.imageDataRaw = imageDataRaw;
          preview.imageDataFiltered = imageDataFiltered;

          output.value = await tenjify(imageDataToDataUrl(imageDataFiltered));
        }
      },
      { deep: true }
    );

    return {
      input,
      preview,
      output,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
