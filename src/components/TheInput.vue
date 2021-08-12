<template>
  <section>
    <h3>入力タイプ</h3>
    <ul class="horizontal">
      <li
        v-for="(inputTypeLabel, inputTypeKey) in inputTypes"
        :key="inputTypeKey"
      >
        <label>
          <input
            v-model="inputTypeChecked"
            type="radio"
            name="inputType"
            :value="inputTypeKey"
          />
          {{ inputTypeLabel }}
        </label>
      </li>
    </ul>
  </section>

  <section v-if="inputTypeChecked === 'ffz'">
    <h3>FFZ連携入力</h3>
    <the-input-ffz @update:imageUrl="onUpdateImageUrl" />
  </section>
  <section v-if="inputTypeChecked === 'file-select'">
    <h3>ファイル選択入力</h3>
    <the-input-file-select @update:imageUrl="onUpdateImageUrl" />
  </section>

  <section>
    <h3>微調整</h3>
    <ul>
      <li>
        <label>ネガ<input v-model="negaModel" type="checkbox" /></label>
      </li>
      <li>
        <label
          >背景<input v-model.number="bgModel" type="range" min="0" max="255" />
          <div
            class="color-preview"
            :style="{
              backgroundColor: `rgb(${bgModel},${bgModel},${bgModel})`,
            }"
          ></div>
          {{ bgModel }}</label
        >
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, Ref } from "vue";
import { useModelWrapper } from "@/libs/model-wrapper";
import TheInputFileSelect from "@/components/TheInputFileSelect.vue";
import TheInputFfz from "@/components/TheInputFfz.vue";

const inputTypes = {
  "file-select": "ファイル選択",
  ffz: "FFZ連携",
};
type InputType = keyof typeof inputTypes;

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
    const inputTypeChecked: Ref<InputType> = ref("file-select");

    const onUpdateImageUrl = (value: string) => {
      emit("update:imageUrl", value);
    };

    return {
      inputTypes,
      inputTypeChecked,
      negaModel: useModelWrapper(props, emit, "nega"),
      bgModel: useModelWrapper(props, emit, "bg"),
      onUpdateImageUrl,
    };
  },
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: unset;
}

ul.horizontal > li {
  display: inline;
}

.color-preview {
  width: 1em;
  height: 1em;
  border: 1px solid gray;
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
}
</style>
