<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar class="constrain">
        <q-btn
          class="large-screen-only q-mr-sm"
          flat
          round
          icon="eva-camera-outline"
          size="18px"
          to="/camera"
          dense
        />
        <q-separator class="large-screen-only" vertical spaced />
        <q-toolbar-title class="text-grand-hotel text-bold">
          Quasar Instagram
        </q-toolbar-title>
        <q-btn
          class="large-screen-only"
          flat
          round
          icon="eva-home-outline"
          size="18px"
          dense
          to="/"
        />
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white small-screen-only" bordered>
      <q-tabs
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent"
      >
        <q-route-tab to="/" icon="eva-home-outline" />
        <q-route-tab to="/camera" icon="eva-camera-outline" />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script></script>

<style lang="scss">
.q-toolbar {
  @media (min-width: $breakpoint-sm-min) {
    height: 77px;
  }
}
.q-toolbar__title {
  font-size: 30px;
  @media (max-width: $breakpoint-xs-max) {
    text-align: center;
  }
}

.q-footer {
  .q-tab__icon {
    font-size: 30px;
  }
}
</style>
