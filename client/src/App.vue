<template>
  <div>
    <nav>
      <div class="nav-wrapper purple darken-3">
        <a id="logo" href="#" class="brand-logo">Habit tracker</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
        </ul>
      </div>
    </nav>
    <div id="container">
      <Auth></Auth>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Auth from './components/Auth.vue';

@Options({
  components: {
    Auth,
  },
})

export default class App extends Vue {}
</script>

<style>
#logo {
  padding-left: 40px;
}
</style>
