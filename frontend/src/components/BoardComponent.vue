<template>
  <div class="q-pa-md">
    <q-table
    title="Leaderboard"
    separator="cell"
    :columns="tableProps.columns"
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
import {computed, ref} from 'vue'
import { QTableProps } from 'quasar';

const userName = ref('name3');

const tableProps :QTableProps = {
  columns:[
  {
    name: 'nickname',
    align: 'center',
    label: 'Nickname',
    field: 'nickname'
  },
  {
    name: 'score',
    align: 'center',
    label: 'Score',
    field: 'score',
  },
],
  rows:[
    {nickname: 'name1', score: '10'},
    {nickname: 'name2', score: '14'},
    {nickname: 'name3', score: '100'},
    {nickname: 'name4', score: '50'},
    {nickname: 'name5', score: '60'},
  ]
}

const sortedRows = computed(() => {
  return tableProps.rows?.slice().toSorted(
    (b, a) => parseFloat(a.score) - parseFloat(b.score)
    );
})
</script>
