<template>
  <label>
    twitchチャンネル名:
    <input type="text" :value="twitchName" @change="onTwitchNameSet" />
  </label>
  <div v-if="error">
    {{ error }}
  </div>
  <div v-if="ffzImageUrls.length > 0">
    <ul>
      <li
        v-for="ffzImageUrl in ffzImageUrls"
        :key="ffzImageUrl"
        style="display: inline"
      >
        <label>
          <input
            v-model="ffzImageUrlPicked"
            type="radio"
            name="ffz-image"
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
    const error = ref("");

    const tryFetch = async () => {
      const api = new Api();
      try {
        error.value = "";
        return (await api.v1.roomDetail(twitchName.value)).data;
      } catch (e) {
        let detail = "";
        if (e.error) {
          const { status, error, message } = e.error;
          detail = ` ${status} ${error} ${message}`;
        }

        error.value = "データを読み込めません。" + detail;
        throw e;
      }
    };
    const onTwitchNameSet = async (e: InputEvent) => {
      twitchName.value = (e.target as HTMLInputElement).value;

      const response = await tryFetch();

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
      error,
      onTwitchNameSet,
      onPick,
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
  white-space: nowrap;
}
</style>
