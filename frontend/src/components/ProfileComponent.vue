<template>
  <q-page>
    <div class="q-pt-xl col items-center">
      <div class="q-py-xl row items-center">
    <q-form
    @submit="onSubmit"
    class="q-my-xl q-py-xl"
    style="margin: 2em auto; max-width: 24em; position: relative;"
    >

            <div class="q-my-xl">
              <q-input
              clearable
              rounded
              outlined
              :item-aligned="true"
              v-model="nickName"
              label="New Nickname"
              class="text-right"
              bg-color="white"
              :rules="[
              val => !!val || '* Required',
              ]"
      lazy-rules
              />
            </div>
            <q-btn
            label="Save"
            type="submit"
            color="positive"/>
      </q-form>
    </div>
    <div class="q-pt-xl">
    <q-btn
    class="q-ma-xl text-black row items-center"
    size="xl"
    color="white"
    to="/"
    style="border-radius: 10px;"
    >
      Back to menu
    </q-btn>
  </div>
  </div>
  </q-page>
</template>

<script setup lang="ts">
import axios from 'axios';
import {ref} from 'vue';
import {useQuasar} from 'quasar';

const $q = useQuasar();

const nickName = ref($q.localStorage.getItem('name') as string);
const password = ref('');
const isPwd = ref(true);

const onSubmit = () => {
  axios
    .post(process.env.API + '/User/Rename', {
      newDisplayName: nickName.value
    },
    {
      headers: {
      Authorization: 'Bearer ' + $q.localStorage.getItem('token'),
    }
  })
    .then((response) => {
      if (response.status == 200) {
        $q.localStorage.set('name', nickName.value);
      }
    });

  axios
    .post(process.env.API + '/User/UpdatePassword', {
      newPassword: password.value
    },
    {
      headers: {
      Authorization: 'Bearer ' + $q.localStorage.getItem('token') //TODO: Update Pass
    }
    })
    .then((response) => {
      if (response.status == 200) {
        console.log('Password changed');
      } else console.log('not changed');
    });
};
</script>
