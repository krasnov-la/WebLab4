<template>
  <q-page class="row items-center justify-evenly">
    <q-card flat class="transparent dark non-selectable column items-center justify-between q-pa-lg">
      <q-card class="q-ma-lg bg-primary text-white" style="border-radius: 25px">
        <h1 class="q-ma-md q-mb-lg">Space shooter</h1>
      </q-card>
      <q-card class="column justify-between transparent">
        <q-btn class="q-ma-sm text-black" size="xl" color="white" to="game" style="border-radius: 10px">
          Start game
        </q-btn>
        <q-btn class="q-ma-sm text-black" size="xl" color="white" to="leaderboard" style="border-radius: 10px">
          Leaderboards
        </q-btn>
        <q-btn v-if="!authorized" class="q-ma-sm text-black" size="xl" color="white" to="auth" style="border-radius: 10px">
          Log in
        </q-btn>
        <q-btn v-if="authorized" class="q-ma-sm text-black" size="xl" color="white" to="profile" style="border-radius: 10px">
          Profile
        </q-btn>
        <q-btn v-if="authorized" @click="LogOut" class="q-ma-sm text-black" size="xl" color="white" style="border-radius: 10px">
          Log out
        </q-btn>
        <q-btn @click="closeApp" class="q-ma-sm text-black" size="xl" color="white" style="border-radius: 10px">
          Exit
        </q-btn>
      </q-card>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import {useQuasar} from 'quasar';
// import ingame from 'src/assets/ingame.wav';

const $q = useQuasar();

// var audio = new Audio(ingame);
// audio.volume = 0.5;
// audio.play();

const authorized = $q.localStorage.getItem('refreshToken') !== null;
const LogOut = () => {
  $q.localStorage.clear();
  window.location.href = '/';
};
const closeApp = () => {
  const {app} = require("electron")
  app.quit()
}
</script>
