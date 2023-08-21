<template>
  <q-page class="constrain q-pa-md">
    <q-card
      v-for="post in posts"
      :key="post.id"
      class="card-post q-mb-md"
      flat
      bordered
    >
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="/src/statics/Avatar.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">Scripturesdev</q-item-label>
          <q-item-label caption> {{ post.location }} </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />
      <q-img :src="post.imageUrl" />
      <q-card-section>
        <div>{{ post.caption }}</div>
        <div class="text-caption text-grey">{{ niceDate(post.date) }}</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { date } from "quasar";

export default {
  name: "PageHome",
  // data method returns json elements
  data() {
    return {
      posts: [
        {
          id: 1,
          caption: "Golden gate Bridge",
          date: 1691607808765,
          location: "San Fransisco, US",
          imageUrl: "https://cdn.quasar.dev/img/parallax2.jpg",
        },
        {
          id: 2,
          caption: "Golden gate Bridge",
          date: 1691607808765,
          location: "San Fransisco, US",
          imageUrl: "https://cdn.quasar.dev/img/parallax2.jpg",
        },
        {
          id: 3,
          caption: "Golden gate Bridge",
          date: 1691607808765,
          location: "San Fransisco, US",
          imageUrl: "https://cdn.quasar.dev/img/parallax2.jpg",
        },
        {
          id: 4,
          caption: "Golden gate Bridge",
          date: 1691607808765,
          location: "San Fransisco, US",
          imageUrl: "https://cdn.quasar.dev/img/parallax2.jpg",
        },
      ],
    };
  },
  // filters are depracated and replaced by computed
  computed: {
    niceDate(value) {
      return date.formatDate(value, "MMMM D h:mmA");
    },
  },
};
</script>

<style lang="scss">
.card-post {
  .q-img {
    min-height: 200px;
  }
}
</style>
