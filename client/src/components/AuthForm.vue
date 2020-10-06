<template>
  <div class="col s12 m6">
    <div class="card grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">{{ name }}</span>
        <div class="row">
          <form class="col s12">
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
          </form>
        </div>
        <div class="card-action">
          <a class="waves-effect waves-light btn" @click="onSubmit">{{ name }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
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
    async onSubmit() {
      if (this.username && this.password) {
        await this.sendRequest();
      } else {
        console.error('username and password cannot be empty');
      }
    },
    async sendRequest() {
      try {
        const response = await axios({
          method: 'post',
          url: `http://localhost:3000/api/auth/${this.action}`,
          data: {
            username: this.username,
            password: this.password,
          },
        });
        this.$emit('authenticate', response.data.token);
      } catch (error) {
        console.error(error.message);
        console.log('henlo');
      }
    },
  },
};
</script>
