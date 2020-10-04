<template>
  <div class="row" id="auth">
    <div class="col s12 m6">
      <div class="card grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Log in</span>
          <div class="row">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <input id="username_login" type="text" class="validate" />
                  <label for="username_login">Username</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input id="password_login" type="password" class="validate" />
                  <label for="password_login">Password</label>
                </div>
              </div>
            </form>
          </div>
          <div class="card-action">
            <a class="waves-effect waves-light btn">Log in</a>
          </div>
        </div>
      </div>
    </div>
    <div class="col s12 m6">
      <div class="card grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Sign up</span>
          <div class="row">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <input id="username_signup" type="text" class="validate" />
                  <label for="username_signup">Username</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input id="password_signup" type="password" class="validate" />
                  <label for="password_signup">Password</label>
                </div>
              </div>
            </form>
          </div>
          <div class="card-action">
            <a class="waves-effect waves-light btn">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auth',
};
</script>

<style scoped>
#auth{
  padding: 30px;
}
</style>
