<template>
  <div class="columns is-mobile is-centered">
    <div class="box login">
      <b-field label="Email" v-model="email">
        <b-input maxlength="30"></b-input>
      </b-field>
      <b-field label="Password">
        <b-input type="password" v-model="password" password-reveal></b-input>
      </b-field>
      <button class="button is-primary">
        <span>Login</span>
        <span class="icon">
          <i class="mdi mdi-login"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      return 'coming soon'
    }
  }
}
</script>

<style>
.loginBox {
  width: 300px;
}
</style>
