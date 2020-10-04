<template>
  <div class="row" id="auth">
    <AuthForm action="Log in" />
    <AuthForm action="Sign up" />
  </div>
</template>

<script>
import AuthForm from './AuthForm.vue';

export default {
  name: 'Auth',
  components: {
    AuthForm,
  },
};
</script>

<style scoped>
#auth {
  padding: 30px;
}
</style>
