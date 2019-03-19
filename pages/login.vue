<template>
  <div class="columns is-mobile is-centered">
    <div class="box login">
      <form v-on:submit.prevent>
        <h2 class="title is-3">Login</h2>
        <b-field label="Email">
          <b-input type="text" v-model="email" maxlength="30"></b-input>
        </b-field>
        <b-field label="Password">
          <b-input type="password" v-model="password" password-reveal></b-input>
        </b-field>
        <button @click="login" class="button is-primary">
          <span>Login</span>
          <span class="icon">
            <i class="mdi mdi-login"></i>
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { auth } from '~/plugins/firebase.js'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      auth.signInWithEmailAndPassword(this.email, this.password).then(
        () => {
          this.$store.commit('SET_USER', 'logged-in')
          this.$router.push('/')
        },
        err => {
          this.$dialog.alert({
            title: 'Oops!',
            message: err.message,
            type: 'is-danger',
            hasIcon: true,
            icon: 'alert-circle'
          })
        }
      )
    }
  }
}
</script>

<style>
.loginBox {
  width: 300px;
}
</style>
