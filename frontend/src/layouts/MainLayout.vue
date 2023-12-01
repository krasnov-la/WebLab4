<template>
  <q-layout class="bg-image" view="hHh lpR fFf" style="overflow: hidden">
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {useQuasar,} from 'quasar';

const $q = useQuasar();

const authorized = $q.localStorage.getItem('refreshToken') !== null;
const LogOut = () => {
  $q.localStorage.clear();
  window.location.href = '/';
};
</script>

<style scoped lang="sass">
.bg-image
  background-image: url("/background.png")
  background-repeat: no-repeat
  background-size: cover
</style>
