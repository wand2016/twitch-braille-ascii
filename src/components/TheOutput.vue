<template>
  <textarea cols="60" rows="20" :value="modelValue" readonly></textarea><br />
  <button type="button" @click="copyToClipboard">クリップボードにコピー</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type Props = {
  modelValue: string;
};

export default defineComponent({
  name: "TheOutput",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup(props: Props) {
    const copyToClipboard = async () => {
      await navigator.clipboard?.writeText(props.modelValue);
    };

    return {
      copyToClipboard,
    };
  },
});
</script>

<style scoped></style>
