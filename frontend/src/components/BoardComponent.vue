<template>
  <div class="q-pa-md full-width">

    <q-table
    title="Leaderboard"
    separator="cell"
    :columns="tColumns.columns"
    :rows="sortedRows"
    row-key="name"
    >
    <template v-slot:body="props">
        <q-tr :props="props" :class="[(props.row.name == userName)?'bg-green text-white':'bg-white text-black']">
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
    <q-btn class="q-ma-sm text-black" size="xl" color="white" to="/" style="border-radius: 10px">
          Back to menu
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, reactive, onMounted} from 'vue';
import { QTableProps } from 'quasar';
import axios from 'axios';
import {useQuasar} from 'quasar';

const $q = useQuasar();

const userName = $q.localStorage.getItem('name');
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
