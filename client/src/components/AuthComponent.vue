<template>
  <div class="row" id="auth">
    <AuthFormComponent name="Log in" action="login" @submit="onSubmitLogin" />
    <AuthFormComponent name="Sign Up" action="signup" @submit="onSubmitSignup" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import authService from '../services/AuthService';
import AuthFormComponent from './AuthFormComponent.vue';

export default defineComponent({
  name: 'Auth',
  components: {
    AuthFormComponent,
  },
  methods: {
    async onSubmitLogin(username: string, password: string): Promise<any> {
      try {
        await authService.authenticate(username, password, 'login');
        this.$emit('authenticate');
      } catch (error) {
        console.error(error.message);
      }
    },
    async onSubmitSignup(username: string, password: string): Promise<any> {
      try {
        await authService.authenticate(username, password, 'signup');
        this.$emit('authenticate');
      } catch (error) {
        console.error(error.message);
      }
    },
  },
});
</script>

<style scoped>
#auth {
  padding: 30px;
}
</style>
