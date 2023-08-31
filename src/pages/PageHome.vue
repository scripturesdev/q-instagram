<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <template v-if="!loadingPosts && posts.length">
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
        </template>
        <template v-else-if="!posts.length && !loadingPosts"
          >No posts yet...</template
        >
        <template v-else>
          <q-card flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-skeleton size="40px" type="QAvatar" animation="fade" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-skeleton height="200px" square animation="fade" />

            <q-card-section>
              <q-skeleton type="text" class="text-subtitle2" animation="fade" />
              <q-skeleton
                type="text"
                width="50%"
                class="text-subtitle2"
                animation="fade"
              />
            </q-card-section> </q-card
        ></template>
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
import { computed, ref } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";

const $q = useQuasar();
const posts = ref([]);
const loadingPosts = ref(false);

function getPosts() {
  loadingPosts.value = true;
  axios
    .get("http://localhost:3000/posts")
    .then((response) => {
      posts.value = response.data;
      loadingPosts.value = false;
    })
    .catch((err) => {
      $q.dialog({
        title: "Error",
        message: "Could not download posts",
      });
    });
}

getPosts();

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
