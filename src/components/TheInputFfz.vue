<template>
  <label>
    twitchチャンネル名
    <input type="text" :value="twitchName" @change="onTwitchNameSet" />
  </label>
  <div>
    <ul>
      <li
        v-for="ffzImageUrl in ffzImageUrls"
        :key="ffzImageUrl"
        style="display: inline"
      >
        <label>
          <input
            type="radio"
            name="ffz-image"
            v-model="ffzImageUrlPicked"
            :value="ffzImageUrl"
            @update:modelValue="onPick"
          />
          <img :src="ffzImageUrl" alt="ffzImageUrl" width="30" />
        </label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref } from "vue";
import { Api } from "@/Api";
import axios from "axios";

type Set = {
  emoticons: EmoticonsEntity[];
};
type EmoticonsEntity = {
  id: number;
  urls: Urls;
};
type Urls = {
  1: string;
  2?: string;
  4?: string;
};

export default defineComponent({
  name: "TheInputFfz",

  emits: ["update:imageUrl"],
  setup(_, { emit }: SetupContext) {
    const twitchName = ref("");
    const ffzImageUrls = ref([] as string[]);
    const ffzImageUrlPicked = ref("");
    const onTwitchNameSet = async (e: InputEvent) => {
      twitchName.value = (e.target as HTMLInputElement).value;

      const api = new Api();

      const response = (await api.v1.roomDetail(twitchName.value)).data;

      const sets: Record<string, Set> = response.sets as unknown as Record<
        string,
        Set
      >;

      ffzImageUrls.value = Object.values(sets)
        .flatMap((set) => set.emoticons)
        .map((emoticon) => {
          return emoticon.urls[4] ?? emoticon.urls[2] ?? emoticon.urls[1];
        })
        .map((url) => `https:${url}`);
    };

    const onPick = async (ffzImageUrl: string) => {
      ffzImageUrlPicked.value = ffzImageUrl;

      console.log("picked", ffzImageUrl);

      if (ffzImageUrl) {
        const blob = (await axios.get(ffzImageUrl, { responseType: "blob" }))
          .data;
        const blobUrl = URL.createObjectURL(blob);

        emit("update:imageUrl", blobUrl);
      }
    };

    return {
      twitchName,
      ffzImageUrls,
      ffzImageUrlPicked,
      onTwitchNameSet,
      onPick,
    };
  },
});
</script>

<style scoped></style>
