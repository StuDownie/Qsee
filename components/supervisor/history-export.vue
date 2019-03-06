<template>
  <form action>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Download a report</p>
      </header>
      <section class="modal-card-body">
        <b-tabs v-model="activeTab" type="is-toggle" expanded>
          <b-tab-item label="Start date" icon="calendar">
            <b-field>
              <b-datepicker
                v-model="start"
                inline
                :first-day-of-week="1"
                placeholder="Click to select..."
              ></b-datepicker>
            </b-field>
          </b-tab-item>
          <b-tab-item label="End date" icon="calendar">
            <b-field>
              <b-datepicker
                v-model="end"
                inline
                :first-day-of-week="1"
                placeholder="Click to select..."
              ></b-datepicker>
            </b-field>
          </b-tab-item>
        </b-tabs>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Cancel</button>
        <button v-if="activeTab == 1" @click.prevent="exportReport" class="button is-primary">
          <b-icon icon="download"></b-icon>
          <span>Download</span>
        </button>
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
      activeTab: 0,
      start: new Date(),
      end: new Date(),
      history: []
    }
  },
  firestore() {
    return {
      settings: fireDb.collection('settings').doc('general')
    }
  },
  methods: {
    exportReport() {
      this.history = fireDb
        .where('created', '>=', `${this.start}`)
        .where('created', '<=', `${this.end}`)
      // return this.$parent.close()
      return
    }
  }
}
</script>

<style scoped>
</style>
