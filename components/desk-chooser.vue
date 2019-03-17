<template>
  <div class="columns is-mobile is-centered">
    <div class="box login has-text-centered">
      <h2 class="title is-4">Choose a desk</h2>
      <span v-for="(desk, idx) in settings.agents" :key="idx">
        <button @click="chooseDesk(`Desk ${desk}`)" class="button is-primary">
          <span>Desk {{desk}}</span>
        </button>
        <br>
        <br>
      </span>
    </div>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'

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
    chooseDesk(desk) {
      this.$store.commit('SET_DESK', desk)
      localStorage.setItem('desk', desk)
    }
  }
}
</script>

<style scoped>
</style>
