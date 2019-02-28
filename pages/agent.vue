<template>
  <div id="cases">
    <div v-if="withCustomer > 0" class="section has-text-centered">
      <h1 class="title is-2">You have a customer</h1>
      <button @click="callAgain" class="button is-danger is-large">Call customer again</button>
      <button @click="newCustomer" class="button is-primary is-large">Take another customer</button>
    </div>
    <div v-if="withCustomer == 0" class="columns">
      <div class="column">
        <next-payornot :tickets="tickets" :desk="desk" :today="today"></next-payornot>
      </div>
      <!-- *************************** -->
      <!-- queue summary -->
      <!-- *************************** -->
      <div id="queue" class="column has-text-centered">
        <div class="box">
          <div>
            <span id="queueTotal">
              <h3
                class="title is-4"
              >Queue ({{waiting.length}} waiting | {{atDesks.length}} at desks)</h3>
            </span>
          </div>

          <div id="summaryBox">
            <br>
            <h3 v-if="waiting.length" class="title is-5 has-text-primary">Waiting customers</h3>
            <span v-for="(ticket, id) in waiting" :key="id">
              <span v-if="ticket.state != 'called' && ticket.state != 'seen'">
                {{ `${ticket.id} (${ticket.topic}) ${ticket.printed}` }}
                <br>
              </span>
            </span>
            <br>
            <h3 v-if="atDesks.length" class="title is-5 has-text-primary">At desks</h3>
            <span v-for="(ticket, id) in atDesks" :key="id">
              <span v-if="ticket.state == 'called' && ticket.state != 'seen'">
                {{ `${ticket.id} (${ticket.topic}) ${ticket.printed}` }}
                <br>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { fireDb } from '~/plugins/firebase.js'

import NextPayornot from '@/components/agent/next-payornot'

export default {
  components: { NextPayornot },
  data() {
    return {
      activeTab: 0,
      tickets: [],
      desk: 'user',
      today: moment().format('D MMM YYYY')
    }
  },
  firestore() {
    return {
      tickets: fireDb.collection(this.today).orderBy('id')
    }
  },
  computed: {
    withCustomer() {
      const t = this
      const active = this.tickets
        .filter(function(x) {
          return x.desk == t.desk && x.state == 'called'
        })
        .map(function(x) {
          return x.id
        })
      return +active
    },
    waiting() {
      const wait = this.tickets.filter(function(x) {
        return x.state == null
      })
      return wait
    },
    atDesks() {
      const called = this.tickets.filter(function(x) {
        return x.state == 'called'
      })
      return called
    }
  },
  methods: {
    newCustomer() {
      fireDb
        .collection(this.today)
        .doc(`${this.withCustomer}`)
        .set({ state: 'seen' }, { merge: true })
      return
    },
    callAgain() {
      return 'coming soon'
    }
  }
}
</script>

<style scoped>
</style>
