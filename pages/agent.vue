<template>
  <div id="cases">
    <div v-if="withCustomer > 0" class="section has-text-centered">
      <h1 class="title is-2">You have a customer</h1>
      <nav class="level">
        <div class="level-item has-text-centered">
          <button @click="callAgain" class="button is-danger is-large">Call customer again</button>
        </div>
        <div class="level-item has-text-centered">
          <button @click="newCustomer" class="button is-primary is-large">Take another customer</button>
        </div>
      </nav>
    </div>
    <div v-if="withCustomer == 0" class="columns">
      <div class="column">
        <next-payornot
          v-if="settings.takeCustomer == 1"
          :tickets="tickets"
          :desk="desk"
          :today="today"
        ></next-payornot>

        <next-customer
          v-if="settings.takeCustomer == 2"
          :tickets="tickets"
          :desk="desk"
          :today="today"
        ></next-customer>

        <any-customer
          v-if="settings.takeCustomer == 3"
          :tickets="tickets"
          :desk="desk"
          :today="today"
        ></any-customer>
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
            <span v-for="ticket in waiting" :key="ticket.id">
              <span v-if="ticket.state != 'called' && ticket.state != 'seen'">
                {{ `${ticket.id} (${ticket.topic}) ${time(ticket.printed)}` }}
                <br>
              </span>
            </span>
            <br>
            <h3 v-if="atDesks.length" class="title is-5 has-text-primary">At desks</h3>
            <span v-for="ticket in atDesks" :key="ticket.id">
              <span v-if="ticket.state == 'called' && ticket.state != 'seen'">
                {{ `${ticket.id} (${ticket.topic}) ${time(ticket.printed)}` }}
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
import { fireDb } from '~/plugins/firebase.js'

import NextPayornot from '@/components/agent/next-payornot'
import NextCustomer from '@/components/agent/next-customer'
import AnyCustomer from '@/components/agent/any-customer'

export default {
  components: { NextPayornot, NextCustomer, AnyCustomer },
  data() {
    return {
      activeTab: 0,
      tickets: [],
      settings: [],
      desk: 'user',
      today: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }
  },
  firestore() {
    return {
      tickets: fireDb.collection(this.today).orderBy('id'),
      settings: fireDb.collection('settings').doc('general')
    }
  },
  computed: {
    withCustomer() {
      const t = this
      const active = this.tickets
        .filter(x => x.desk == t.desk && x.state == 'called')
        .map(x => x.id)
      return +active
    },
    customerCalledAt() {
      const t = this
      const calledTime = this.tickets
        .filter(x => x.desk == t.desk && x.state == 'called')
        .map(x => x.seen)
      return +calledTime
    },
    timesCustomerCalled() {
      const t = this
      const times = this.tickets
        .filter(x => x.desk == t.desk && x.state == 'called')
        .map(x => x.timescalled)
      return +times
    },
    waiting() {
      return this.tickets.filter(x => x.state == null)
    },
    atDesks() {
      return this.tickets.filter(x => x.state == 'called')
    }
  },
  methods: {
    newCustomer() {
      fireDb
        .collection(this.today)
        .doc(`${this.withCustomer}`)
        .set(
          {
            state: 'seen',
            completed: new Date().getTime(),
            interaction: new Date().getTime() - this.customerCalledAt
          },
          { merge: true }
        )
      return
    },
    callAgain() {
      const calling = this.timesCustomerCalled + 1
      fireDb
        .collection(this.today)
        .doc(`${this.withCustomer}`)
        .set({ timescalled: calling }, { merge: true })
      return
    },
    time(a) {
      return new Date(a).toLocaleTimeString('en-GB', {
        hour: 'numeric',
        minute: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
</style>
