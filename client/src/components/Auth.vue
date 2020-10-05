<template>
  <div class="row" id="auth">
    <AuthForm action="Log in" @submit="logIn" />
    <AuthForm action="Sign up" @submit="signUp" />
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
    async signUp() {
      try {
        const response = await axios({
          method: 'post',
          url: 'http://localhost:3000/api/auth/signup',
          data: {
            username: 'test',
            password: 'testtest',
          },
        });

        this.authenticated = true;
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    logIn() {
      this.authenticated = true;
      console.log('login');
    },
  },
};
</script>

<style scoped>
#auth {
  padding: 30px;
}
</style>
