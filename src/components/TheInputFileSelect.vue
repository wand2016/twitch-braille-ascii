<template>
  <input type="file" @change="onFileSelect" />
</template>

<script lang="ts">
import { defineComponent, SetupContext } from "vue";

export default defineComponent({
  name: "TheInputFileSelect",
  emits: ["update:imageUrl"],
  setup(_, { emit }: SetupContext) {
    const onFileSelect = (e: InputEvent) => {
      const file: File | null =
        ((e.target as HTMLInputElement).files ?? [])[0] ?? null;
      const objectUrl = file ? URL.createObjectURL(file) : null;
      emit("update:imageUrl", objectUrl);
    };

    return {
      onFileSelect,
    };
  },
});
</script>

<style scoped></style>
