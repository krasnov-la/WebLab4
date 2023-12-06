<template>
  <q-card
  class="q-pb-md column items-center justify-center full-width transparent"
  style="height: 60%;"
  flat

  >
  <div class="row items-center justify-center">
    <q-table
    title="Leaderboard"
    title-class="tableHeader"
    separator="cell"
    :columns="tColumns.columns"
    :rows="sortedRows"
    row-key="name"
    class="myStyle q-pb-lg  q-ma-xl transparent no-shadow text-white row items-center"
    :hide-pagination="true"
    :rows-per-page-options="[10]"
    :bordered="false"
    table-header-class="my-special-class"
    table-colspan="2"
    dark

    >
      <template v-slot:body="props">
          <q-tr :props="props"
          :class="[(props.row.name == userName) ?'text-green-14' : 'text-white']"
          :style="[(props.row.name == userName) ?'font-weight: bold;' : 'font-weight: normal;']"
          >
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="no-border"
              style="font-size: 18px;"
            >
              {{ col.value }}
            </q-td>
          </q-tr>
      </template>
    </q-table>
    </div>
    <q-btn
    class="q-ma-xl text-black"
    size="xl"
    color="white"
    to="/"
    style="border-radius: 10px;"
    >
      Back to menu
    </q-btn>
  </q-card>
</template>

<script setup lang="ts">
import {computed, reactive, onMounted} from 'vue';
import { QTableProps } from 'quasar';
import axios from 'axios';
import {useQuasar} from 'quasar';

const $q = useQuasar();

const userName = $q.localStorage.getItem('name');
const state = reactive({
  rows: [{
    name : '',
    score : ''
  }]
})

const num = 10;
onMounted(() =>{
  axios
    .get(process.env.API + `/Leaderboard/${num}`)
    .then((response) => {
      state.rows = response.data;
    });
  }
)

const headerStyle = "border: transparent; font-weight: bold; font-size: 22px;";

const tColumns : QTableProps ={
  columns : [
  {
    name: 'name',
    align: 'center',
    label: 'Nickname',
    field: 'name',
    headerStyle: headerStyle
  },
  {
    name: 'score',
    align: 'center',
    label: 'Score',
    field: 'score',
    headerStyle: headerStyle
  },
]}

const sortedRows = computed(() => {
  return state.rows.slice().toSorted(
    (b, a) => parseFloat(a.score) - parseFloat(b.score)
    );
})
</script>

<style>
.tableHeader{
  font-weight: bold;
  font-size: 40px;
}
</style>
