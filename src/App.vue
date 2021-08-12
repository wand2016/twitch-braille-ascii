<template>
  <h1>twitchの点字アスキーアートを作るやつ</h1>
  <section>
    <h2>入力</h2>
    <the-input
      v-model:nega="input.nega"
      v-model:bg="input.bg"
      @update:imageUrl="onUpdateImageUrl"
    />
  </section>
  <section>
    <h2>画像プレビュー</h2>
    <the-preview
      :image-data-raw="preview.imageDataRaw"
      :image-data-filtered="preview.imageDataFiltered"
    />
  </section>
  <section>
    <h2>出力</h2>
    <the-output :model-value="output" />
  </section>
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

    const onUpdateImageUrl = (value: string) => {
      input.imageUrl = value;
    };

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
      onUpdateImageUrl,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 640px;
  margin: 0 auto;
}

section {
  padding-left: 1em;
}
</style>
