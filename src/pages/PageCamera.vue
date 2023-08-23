<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video v-show="!imageCaptured" ref="video" class="full-width" autoplay />
      <canvas
        v-show="imageCaptured"
        ref="canvas"
        class="full-width"
        height="240"
      >
      </canvas>
    </div>

    <div class="text-center q-pa-md">
      <q-btn
        @click="captureImage"
        round
        color="grey-10"
        icon="eva-camera"
        size="lg"
      />
    </div>
    <div class="row justify-center q-ma-md">
      <q-input
        class="col col-sm-6"
        v-model="post.caption"
        label="Caption"
        dense
      />
    </div>
    <div class="row justify-center q-ma-md">
      <q-input
        class="col col-sm-6"
        v-model="post.location"
        label="location"
        dense
      >
        <template v-slot:append>
          <q-btn round dense flat icon="eva-navigation-2-outline" />
        </template>
      </q-input>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn unelevated rounded color="grey-10" label="Submit" />
    </div>
  </q-page>
</template>

<script setup>
import { uid } from "quasar";
import { ref, computed, onMounted } from "vue";
//require("md-gum-polyfill");

const post = ref({
  id: uid(),
  caption: "",
  location: "",
  photo: null,
  date: Date.now(),
});

const video = ref(null);
const canvas = ref(null);
const imageCaptured = ref(false);

function initCamera() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
    })
    .then((stream) => {
      video.value.srcObject = stream;
    });
}
onMounted(() => {
  initCamera();
  imageCaptured.value = false;
});

function captureImage() {
  canvas.value.width = video.value.getBoundingClientRect().width;
  canvas.value.height = video.value.getBoundingClientRect().height;
  let context = canvas.value.getContext("2d");
  context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
  imageCaptured.value = true;
  canvas.value.post.photo = canvas.value.toDataURL();
}
</script>

<style lang="sass">
.camera-frame
    border: 2px solid $grey-10
    border-radius: 10px
</style>
