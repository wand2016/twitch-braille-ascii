<template>
  <canvas ref="canvas" width="60" height="0"></canvas>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref, watch } from "vue";
type Props = {
  imageData: ImageData | undefined;
  width: number;
};

export default defineComponent({
  name: "ThePreviewCanvas",
  props: {
    imageData: ImageData,
    width: {
      type: Number,
      default: 60,
    },
  },
  setup(props: Props) {
    const canvas: Ref<HTMLCanvasElement | null> = ref(null);

    const computedHeight = computed(() => {
      if (!props.imageData) {
        return 0;
      }

      const { width: imageDataWidth, height: imageDataHeight } =
        props.imageData;

      return (imageDataHeight * imageDataWidth) / props.width;
    });

    watch(
      () => props.imageData,
      (imageData) => {
        if (!imageData) {
          return;
        }
        canvas.value!.width = imageData.width;
        canvas.value!.height = imageData.height;
        canvas.value!.getContext("2d")!.putImageData(imageData, 0, 0);
      }
    );

    return {
      canvas,
      computedHeight,
    };
  },
});
</script>

<style scoped></style>
