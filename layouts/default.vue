<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <nuxt-link to="/">
            <h1 class="title">{{settings.office}}</h1>
          </nuxt-link>
          <h2 class="subtitle">{{$store.state.desk}}</h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <nuxt/>
      </div>
    </section>

    <footer class="footer has-background-light">
      <div class="content has-text-centered">
        <p>
          <strong>Qsee v1.0</strong> by Stuart Downie.
        </p>
        <p v-if="$store.state.user != 'logged-out'">
          <button @click="logoutUser" class="button">Logout</button>
        </p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
</style>


<script>
import { fireDb, auth } from '~/plugins/firebase.js'

export default {
  data() {
    return {
      settings: []
    }
  },
  firestore() {
    return {
      settings: fireDb.collection('settings').doc('general')
    }
  },
  methods: {
    logoutUser() {
      auth.signOut().then(
        () => {
          this.$store.commit('LOGIN_STATE', 'true')
          this.$store.commit('SET_USER', 'logged-out')
          this.$router.push('/login')
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
