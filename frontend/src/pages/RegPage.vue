<template>
  <q-page class="q-pt-xl column justify-baseline items-center">
    <q-card class="non-selectable q-ma-lg bg-primary text-white" style="border-radius: 25px">
      <h1 class="q-ma-md q-mb-lg">Space shooter</h1>
    </q-card>
    <q-card class="column items-center q-pa-md">
      <q-card-section>
        <h3 class="q-ma-none">Registration</h3>
      </q-card-section>
      <q-separator spaced/>
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input filled v-model="login" label="Login"/>
          <q-input filled v-model="name" label="Nickname"/>
          <q-input
            v-model="password"
            filled
            :type="isPwd ? 'password' : 'text'"
            label="Password"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            filled
            v-model="passwordRepeat"
            :type="isPwd ? 'password' : 'text'"
            label="Repeat password"
          />
          <q-separator/>
          <q-btn label="Register" type="submit" color="primary"/>
          <q-btn label="Go to log in" to="/auth" />
          <q-btn align="right" to="/">Back</q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
  <div
    class="column q-pa-md"
    style="max-width: 400px; margin: 0 auto; padding-top: 100px"
  >
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useQuasar} from 'quasar';
import axios from 'axios';

const login = ref('');
const name = ref('');

const password = ref('');
const passwordRepeat = ref('');
const usedLogin = ref(false);

const isPwd = ref(true);

const $q = useQuasar();

const onSubmit = () => {
  if (password.value === passwordRepeat.value) {
    axios
      .post(process.env.API + '/Auth/Register', {
        login: login.value,
        displayName: login.value,
        password: password.value,
      })
      .then((response) => {
        if (response.status == 200) {
          const data = response.data;
          $q.localStorage.set('token', data.accessToken);
          $q.localStorage.set('refreshToken', data.refreshToken);
          $q.localStorage.set('name', name.value);
          window.location.href = '/';
        } else {
          console.log(response);
          usedLogin.value = true;
        }
      });
  } else {
    alert('Passwords not matched');
  }
};
</script>
