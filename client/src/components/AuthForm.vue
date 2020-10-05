<template>
  <div class="col s12 m6">
    <div class="card grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">{{ action }}</span>
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <input :id="'username_' + actionId" type="text" class="validate" />
                <label :for="'username_' + actionId">Username</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input :id="'password_' + actionId" type="password" class="validate" />
                <label :for="'password_' + actionId">Password</label>
              </div>
            </div>
          </form>
        </div>
        <div class="card-action">
          <a class="waves-effect waves-light btn" @click="$emit('submit')">{{ action }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthForm',
  props: {
    action: String,
  },
  computed: {
    actionId() {
      return this.action.toLowerCase().replace(' ', '_');
    },
  },
};
</script>
