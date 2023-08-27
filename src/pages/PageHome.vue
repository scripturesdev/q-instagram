<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
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
            <div class="text-caption text-grey">
              {{ date.formatDate(post.date, "MMMM D h:mmA") }}
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-4">
        <q-item class="fixed large-screen-only">
          <q-item-section avatar>
            <q-avatar size="48px">
              <img src="/src/statics/Avatar.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">Scripturesdev</q-item-label>
            <q-item-label caption> Scripturesdev </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { date } from "quasar";
import { ref, computed } from "vue";

const posts = ref([
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
]);

// cant used with computed with arguments. this is the same as the function below
//function niceDate (value) {return date.formatDate(value, "MMMM D h:mmA")}
// const niceDate = (value) => {
//   return date.formatDate(value, "MMMM D h:mmA");
// };
</script>

<style lang="scss">
.card-post {
  .q-img {
    min-height: 200px;
  }
}
</style>
