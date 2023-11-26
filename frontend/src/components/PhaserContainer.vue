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