<template>
  <div>
    <nav>
      <div class="nav-wrapper purple darken-3">
        <a id="logo" href="#" class="brand-logo">Habit tracker</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li v-if="authenticated"><a @click="logOut">Log out</a></li>
        </ul>
      </div>
    </nav>
    <div id="container">
      {{ authenticated }}
      <AuthComponent v-if="!authenticated" @authenticate="onAuthenticated" />
      <HabitsListComponent v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthComponent from './components/AuthComponent.vue';
import HabitsListComponent from './components/HabitsListComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    AuthComponent,
    HabitsListComponent,
  },
  data() {
    return {
      authenticated: false,
    };
  },
  methods: {
    onAuthenticated(): void {
      this.authenticated = true;
      console.log(this.authenticated);
    },
    logOut(): void {
      this.authenticated = false;
      // delete cookie
    },
  },
});
</script>

<style>
#logo {
  padding-left: 40px;
}
</style>
