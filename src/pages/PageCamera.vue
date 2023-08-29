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
        v-if="post.hasCameraSupport"
        @click="captureImage"
        color="grey-10"
        icon="eva-camera"
        size="lg"
        round
      />
      <q-file
        v-else
        @input="captureImageFallback"
        v-model="imageUpload"
        accept="image/*"
        label="Choose an image"
        outlined
        counter
        use-chips
      >
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>
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
        :loading="post.locationLoading"
        class="col col-sm-6"
        v-model="post.location"
        label="location"
        dense
      >
        <template v-slot:append>
          <q-btn
            v-if="!post.locationLoading && locationSupported"
            @click="getLocation"
            round
            dense
            flat
            icon="eva-navigation-2-outline"
          />
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
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";

//require("md-gum-polyfill");
const post = ref({
  id: uid(),
  caption: "",
  location: "",
  photo: null,
  date: Date.now(),
  hasCameraSupport: true,
  locationLoading: false,
});

const video = ref(null);
const canvas = ref(null);
const imageCaptured = ref(false);
const imageUpload = ref([]);

function initCamera() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
    })
    .then((stream) => {
      video.value.srcObject = stream;
    })
    .catch((error) => {
      // this will catch ALL other errors to mean no camera support.
      post.value.hasCameraSupport = false;
      //console.log("catch error:", post.value.hasCameraSupport);
    });
}
onMounted(() => {
  initCamera();
  imageCaptured.value = false;
});

onBeforeUnmount(() => {
  if (post.value.hasCameraSupport) {
    disableCamera();
  }
});

// capture image from camera stream
function captureImage() {
  canvas.value.width = video.value.getBoundingClientRect().width;
  canvas.value.height = video.value.getBoundingClientRect().height;
  let context = canvas.value.getContext("2d");
  context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
  imageCaptured.value = true;
  post.value.photo = dataURItoBlob(canvas.value.toDataURL());
  disableCamera();
}

// for those that dont have camera support - upload picture
// argument comes in the form of event,
// hence to reach the file its ev.target.files[0] for the first file.
function captureImageFallback(ev) {
  post.value.photo = ev.target.files[0];
  let context = canvas.value.getContext("2d");
  // from stackoverflow - upload image to canvas
  let reader = new FileReader();
  reader.onload = (event) => {
    let img = new Image();
    img.onload = () => {
      canvas.value.width = img.width;
      canvas.value.height = img.height;
      context.drawImage(img, 0, 0);
      imageCaptured.value = true;
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(post.value.photo);
}

function disableCamera() {
  video.value.srcObject.getTracks().forEach((track) => {
    track.stop();
  });
  video.value.srcObject = null;
}

// from online convert to blob
function dataURItoBlob(dataURI) {
  let byteString = atob(dataURI.split(",")[1]);
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  var blob = new Blob([ab], { type: mimeString });
  return blob;
}

function getLocation() {
  post.value.locationLoading = true;
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("position", position);
      getCityAndCountry(position);
    },
    (err) => {
      console.log("err:", err);
      locationError();
      post.value.locationLoading = false;
    },
    { timeout: 7000 } // if cant get location then timeout
  );
}

// works but the geocode is 1 api call / min limited for free tier.
// apikey=&auth=662945502730805409680x77334
// try out google maps free tier (500 api calls / day)
function getCityAndCountry(position) {
  console.log("in getcityandcountry");
  let apiURL = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`;
  axios
    .get(apiURL)
    .then((result) => {
      console.log(result);
      post.value.location = result.data.city;
      if (result.data.country) {
        post.value.location += `, ${result.data.country}`;
      }
      post.value.locationLoading = false;
    })
    .catch((err) => {
      console.log("error:", err);
      locationError();
      post.value.locationLoading = false;
    });
}
const $q = useQuasar();

function locationError() {
  $q.dialog({
    title: "Error",
    message: "Could not find your location",
  });
}

function locationSupported() {
  if ("geolocation" in navigator) return true;
  return false;
}
</script>

<style lang="sass">
.camera-frame
    border: 2px solid $grey-10
    border-radius: 10px
</style>
