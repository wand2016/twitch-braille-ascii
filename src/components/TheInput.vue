<template>
  <fieldset>
    <legend>入力</legend>
    <the-input-ffz @update:imageUrl="onUpdateImageUrl" />

    <p>
      <the-input-file-select @update:imageUrl="onUpdateImageUrl" />
    </p>
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
import TheInputFileSelect from "@/components/TheInputFileSelect.vue";
import TheInputFfz from "@/components/TheInputFfz.vue";

type Props = {
  nega: boolean;
  bg: number;
};

export default defineComponent({
  name: "TheInput",
  components: { TheInputFfz, TheInputFileSelect },
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
    const onUpdateImageUrl = (value: string) => {
      emit("update:imageUrl", value);
    };

    return {
      negaModel: useModelWrapper(props, emit, "nega"),
      bgModel: useModelWrapper(props, emit, "bg"),
      onUpdateImageUrl,
    };
  },
});
</script>

<style scoped></style>
