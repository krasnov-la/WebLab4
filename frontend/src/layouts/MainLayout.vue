<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="q-px-xl q-py-md row justify-between items-baseline">
        <q-toolbar-title shrink class="non-selectable col">
          <router-link to="/" class="nav-item site-title">
            Menu
          </router-link>
        </q-toolbar-title>
        <div class="row justify-between col-5">
          <router-link
          class="pages-nav nav-item page-title"
          to="/game"
          >
          Play
          </router-link>
          <router-link
            to="/profile"
            class="pages-nav nav-item page-title non-selectable"
            v-if="authorized"
          >
            Profile
          </router-link>
          <router-link
            to="/leaderboard"
            class="pages-nav nav-item page-title non-selectable"
          >
            Leaderboard
          </router-link>
          <a
            href="#"
            class="pages-nav nav-item page-title"
            v-if="authorized"
            @click="LogOut"
          >
            Exit
          </a>
          <router-link
            to="/auth"
            class="pages-nav nav-item page-title"
            v-if="!authorized"
          >
            Auth
          </router-link>
          <router-link
            to="/reg"
            class="pages-nav nav-item page-title"
            v-if="!authorized"
          >
            Reg
          </router-link>
          </div>
      </q-toolbar>
    </q-header>
  <q-page-container>
    <router-view />
  </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar,  } from 'quasar';

const $q = useQuasar();
console.log($q, $q.localStorage);
const authorized = $q.localStorage.getItem('refreshToken') !== null;
const LogOut = () => {
  $q.localStorage.clear();
  window.location.href = '/';
};
</script>

<style scoped lang="sass">
.site-title
  font-family: "Josefin Sans", sans-serif
  font-weight: bold
  font-size: x-large

.page-title
  font-family: "Ubuntu Regular", sans-serif
  font-size: medium

.nav-item
  text-decoration: none
  color: black
  display: block
  position: relative

  &:after
    position: absolute
    bottom: 0
    left: 0
    right: 0
    margin: auto
    width: 0
    content: '.'
    color: transparent
    background: black
    height: 1px
    transition: all 0.3s

  &:hover:after
    width: 100%
</style>
