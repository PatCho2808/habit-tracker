<template>
  <div class="row" id="auth">
    <AuthForm name="Log in" action="login" @authenticate="onAuthentication" />
    <AuthForm name="SignUp" action="signUp" @authenticate="onAuthentication" />
  </div>
</template>

<script>
import axios from 'axios';
import AuthForm from './AuthForm.vue';

export default {
  name: 'Auth',
  components: {
    AuthForm,
  },
  data() {
    return {
      authenticated: false,
    };
  },
  methods: {
    onAuthentication(token) {
      document.cookie = `token=${token}`;
    },
  },
};
</script>

<style scoped>
#auth {
  padding: 30px;
}
</style>
