<template>
  <q-page>
    <q-form
    @submit="onSubmit"
    class="q-mt-lg"
    style="margin: 2em auto; max-width: 24em; position: relative;"
    >

            <div class="q-my-md">
              <q-input
               square
               filled
               v-model="nickName"
               label="Nickname:"
               class="text-right"
               />
            </div>
            <div class="q-my-md" >
              <q-input
              v-model="password"
              square
              filled
              :type="isPwd ? 'password' : 'text'"
              label="New password"
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
  </q-page>
</template>

<script setup lang="ts">
import axios from 'axios';
import {ref} from 'vue';
const nickName = ref('Name123');
const password = ref('');
const isPwd = ref(true);

const onSubmit = () => {
  axios
    .post(process.env.API + '/User/Rename', {
      newDisplayName: nickName.value
    })
    .then((response) => {
      if (response.status == 200) {
        console.log('Nick changed');
      } else console.log(response);
    });
  axios
    .post(process.env.API + '/User/UpdatePassword', {
      newPassword: password.value
    })
    .then((response) => {
      if (response.status == 200) {
        console.log('Password changed');
      } else console.log(response);
    });
};
</script>
