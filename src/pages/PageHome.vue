<template>
  <q-page class="constrain q-pa-md">
    <q-card class="card-post" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="/src/statics/Avatar.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">Scripturesdev</q-item-label>
          <q-item-label caption> Gothenburg, Sweden </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />
      <q-img class="col" src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-card-section>
        <div>Golden Gate Bridge</div>
        <div class="text-caption text-grey">Jun 10 9:33AM</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageHome",
});
</script>

<style lang="scss">
.card-post {
  .q-img {
    min-height: 200px;
  }
}
</style>
