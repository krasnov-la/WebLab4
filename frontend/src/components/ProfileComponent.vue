<template>
  <q-page>
    <div class="q-ma-xl">
      <div class="q-py-xl row items-center">
    <q-form
    @submit="onSubmit"
    class="q-mt-lg"
    style="margin: 2em auto; max-width: 24em; position: relative;"
    >

            <div class="q-my-xl">
              <q-input
               square
               filled
               v-model="nickName"
               label="New Nickname:"
               class="text-right"
               bg-color="white"
               />
            </div>
            <div class="q-my-xl" >
              <q-input
              v-model="password"
              square
              filled
              :type="isPwd ? 'password' : 'text'"
              label="New password"
              bg-color="white"
              >
                  <template v-slot:append>
                    <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                    />
                </template>
              </q-input>
            </div>
            <q-btn label="Save" type="submit" color="positive"/>
      </q-form>
    </div>
      <q-btn
      class="q-my-xl text-black row"
      size="xl"
      color="white"
      to="/"
      >
          Back to menu
    </q-btn>
  </div>
  </q-page>
</template>

<script setup lang="ts">
import axios from 'axios';
import {ref} from 'vue';
import {useQuasar} from 'quasar';

const $q = useQuasar();

const nickName = ref('Name123');
const password = ref('');
const isPwd = ref(true);

const onSubmit = () => {
  console.log('Bearer ' + $q.localStorage.getItem('token'))
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
        console.log('Nick changed');
      }
    });
  axios
    .post(process.env.API + '/User/UpdatePassword', {
      newPassword: password.value
    },
    {
      headers: {
      Authorization: 'Bearer ' + $q.localStorage.getItem('token') //TODO: valid authorize
    }
    })
    .then((response) => {
      if (response.status == 200) {
        console.log('Password changed');
      } else console.log('not changed');
    });
};
</script>
