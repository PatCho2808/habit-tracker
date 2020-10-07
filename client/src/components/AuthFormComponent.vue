<template>
  <div class="col s12 m6">
    <div class="card grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">{{ name }}</span>
        <div class="row">
          <form class="col s12" @submit="onSubmit">
            <div class="row">
              <div class="input-field col s12">
                <input :id="'username_' + action" type="text" class="validate" v-model="username" />
                <label :for="'username_' + action">Username</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input
                  :id="'password_' + action"
                  type="password"
                  class="validate"
                  v-model="password"
                />
                <label :for="'password_' + action">Password</label>
              </div>
            </div>
            <div class="card-action">
              <button class="waves-effect waves-light btn" type="submit" value="submit">
                {{ name }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AuthForm',
  props: {
    action: String,
    name: String,
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit(event: Event): void {
      event.preventDefault();
      if (this.username && this.password) {
        this.$emit('submit-auth-form', this.username, this.password);
      } else {
        console.error('username and password cannot be empty');
      }
    },
  },
});
</script>
