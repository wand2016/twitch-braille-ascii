<template>
  <textarea
    :class="klass"
    cols="60"
    rows="20"
    :value="modelValue"
    readonly
  ></textarea
  ><br />
  <label><input v-model="darkMode" type="checkbox" />ダークテーマ</label><br />
  <button type="button" @click="copyToClipboard">クリップボードにコピー</button>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

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
    const darkTheme = ref(true);
    const copyToClipboard = async () => {
      await navigator.clipboard?.writeText(props.modelValue);
    };
    const klass = computed(() => ({
      "light-theme": !darkTheme.value,
      "dark-theme": darkTheme.value,
    }));

    return {
      copyToClipboard,
      darkMode: darkTheme,
      klass,
    };
  },
});
</script>

<style scoped>
.light-theme {
  color: black;
  background-color: white;
}
.dark-theme {
  color: rgb(239, 239, 241);
  background-color: rgb(24, 24, 27);
}
</style>
