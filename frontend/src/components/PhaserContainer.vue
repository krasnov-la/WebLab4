<<<<<<< HEAD
<template>
  <div id="game">
  </div>
</template>

<script lang="ts">
import { launch } from 'src/game/game';
import { defineComponent } from 'vue';

export default defineComponent({
  name: "PhaserContainer",
  mounted() {
    launch();
  }
})
</script>
=======
<script setup lang="ts">
import {launch} from 'src/game/game';
import {onMounted} from "vue";

onMounted(() => launch());

</script>

<template>
  <div id="game" style="overflow: hidden">
  </div>
</template>
>>>>>>> main
