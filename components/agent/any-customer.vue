<template>
  <div class="box">
    <h2 class="title is-4 has-text-centered">Choose a waiting customer</h2>
    <p
      v-if="waitingCustomers.length"
      v-for="tkt in waitingCustomers"
      :key="tkt.id"
      class="has-text-centered"
    >
      <button @click="takeCustomer(tkt.id, tkt.printed)" class="button is-primary">
        <span>Ticket {{tkt.id}} ({{tkt.topic}}) {{time(tkt.printed)}}</span>
      </button>
      <br>
      <br>
    </p>
    <p v-if="!waitingCustomers.length" class="has-text-centered">No customers waiting</p>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'

export default {
  props: ['tickets', 'desk', 'today'],
  computed: {
    waitingCustomers() {
      return this.tickets.filter(
        x => x.state !== 'seen' && x.state !== 'called'
      )
    }
  },
  methods: {
    takeCustomer(ticket, printed) {
      fireDb
        .collection(this.today)
        .doc(ticket)
        .set(
          {
            state: 'called',
            desk: this.desk,
            seen: new Date().getTime(),
            wait: new Date().getTime() - printed,
            timescalled: 1
          },
          { merge: true }
        )
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
