<template>
  <div class="q-pa-md">
    <q-table
    title="Leaderboard"
    separator="cell"
    :columns="tColumns.columns"
    :rows="sortedRows"
    row-key="name"
    >
    <template v-slot:body="props">
        <q-tr :props="props" :class="[(props.row.nickname == userName)?'bg-accent text-white':'bg-white text-black']">
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, reactive, onMounted} from 'vue';
import { QTableProps } from 'quasar';
import axios from 'axios';

const userName = ref('name3');
const state = reactive({
  rows: [{
    name : '',
    score: ''
  }]
})

const num = 20;
onMounted(() =>{
  axios
    .get(process.env.API + `/Leaderboard/${num}`)
    .then((response) => {
      state.rows = response.data;
    })
  }
)

const tColumns : QTableProps ={
  columns : [
  {
    name: 'name',
    align: 'center',
    label: 'Nickname',
    field: 'name'
  },
  {
    name: 'score',
    align: 'center',
    label: 'Score',
    field: 'score',
  },
]}

const sortedRows = computed(() => {
  return state.rows.slice().toSorted(
    (b, a) => parseFloat(a.score) - parseFloat(b.score)
    );
})
</script>
