<template>
  <form action>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Settings</p>
      </header>
      <section class="modal-card-body">
        <b-tabs v-model="activeSetting" type="is-boxed">
          <b-tab-item label="General" icon="home">
            <b-field label="Office">
              <b-input type="text" :value="settings.office" placeholder="Office name"></b-input>
            </b-field>
            <b-field label="Password">
              <b-input type="password" password-reveal placeholder="Your password"></b-input>
            </b-field>
          </b-tab-item>

          <b-tab-item label="Advanced" icon="settings-outline">
            <b-field label="Office">
              <b-input type="text" placeholder="Office name"></b-input>
            </b-field>
            <b-field label="Password">
              <b-input type="password" password-reveal placeholder="Your password"></b-input>
            </b-field>
          </b-tab-item>
        </b-tabs>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button class="button is-primary">Login</button>
      </footer>
    </div>
  </form>
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'

export default {
  props: ['email', 'password'],
  data() {
    return {
      activeSetting: 0,
      settings: []
    }
  },
  firestore() {
    return {
      settings: fireDb.collection('settings').doc('general')
    }
  }
}
</script>

<style scoped>
</style>
