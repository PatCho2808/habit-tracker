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
      <AuthComponent v-if="!authenticated" @authenticate="onAuthenticated" />
      <HabitsListComponent v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import authService from './services/AuthService';
import AuthComponent from './components/AuthComponent.vue';
import HabitsListComponent from './components/HabitsListComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    AuthComponent,
    HabitsListComponent,
  },
  setup() {
    const authenticated = ref(authService.getIsAuthenticated());

    const onAuthenticated = () => {
      console.log('onAuthenticated');
      authenticated.value = true;
    };

    const logOut = () => {
      console.log('logOut');
      authenticated.value = false;
    };

    return {
      authenticated,
      onAuthenticated,
      logOut,
    };
  },
});
</script>

<style>
#logo {
  padding-left: 40px;
}
</style>
