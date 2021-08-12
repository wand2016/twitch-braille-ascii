<template>
  <fieldset>
    <legend>入力</legend>

    <p><input type="text" :value="webUrl" @change="onUrlSet" /></p>
    <p><input type="file" @change="onFileSelect" /></p>
    <p>
      <label>反転<input v-model="negaModel" type="checkbox" /></label>
      <label
        >背景<input v-model="bgModel" type="range" min="0" max="255"
      /></label>
    </p>
  </fieldset>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref } from "vue";
import { useModelWrapper } from "@/libs/model-wrapper";

type Props = {
  nega: boolean;
  bg: number;
};

export default defineComponent({
  name: "TheInput",
  props: {
    nega: {
      type: Boolean,
      default: false,
    },
    bg: {
      type: Number,
      default: 255,
    },
  },
  emits: ["update:nega", "update:bg", "update:imageUrl"],
  setup(props: Props, { emit }: SetupContext) {
    const onFileSelect = (e: InputEvent) => {
      const file: File | null =
        ((e.target as HTMLInputElement).files ?? [])[0] ?? null;
      const objectUrl = file ? URL.createObjectURL(file) : null;
      emit("update:imageUrl", objectUrl);
    };

    const webUrl = ref("");
    const onUrlSet = (e: InputEvent) => {
      webUrl.value = (e.target as HTMLInputElement).value;

      emit("update:imageUrl", webUrl.value);
    };

    return {
      onFileSelect,
      negaModel: useModelWrapper(props, emit, "nega"),
      bgModel: useModelWrapper(props, emit, "bg"),
      webUrl,
      onUrlSet,
    };
  },
});
</script>

<style scoped></style>
