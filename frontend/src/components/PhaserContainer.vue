<script setup lang="ts">
import {launch} from 'src/game/game';
import {onMounted} from "vue";

onMounted(() => launch());

</script>

<template>
  <div id="game" style="overflow: hidden">
  </div>
</template>