<template>
  <div class="box">
    <h2 class="title is-4">Next customer</h2>
    <span
      v-if="nextTicket.length"
      v-for="tkt in nextTicket"
      :key="tkt.id"
      class="has-text-centered"
    >
      <h2 class="title is-4">Ticket {{tkt.id}}</h2>
      <h3 class="title is-5">{{tkt.topic}}</h3>
      <p class="has-text-centered">{{time(tkt.printed)}}</p>
      <hr>
      <p class="has-text-centered">
        <button @click="takeCustomer(tkt.id, tkt.printed)" class="button is-primary">
          <span>Take this customer</span>
        </button>
      </p>
    </span>
    <span v-if="!nextTicket.length" class="has-text centered">No customers waiting</span>
  </div>
</template>

<script>
import moment from 'moment'
import { fireDb } from '~/plugins/firebase.js'

export default {
  props: ['tickets', 'desk', 'today'],
  computed: {
    nextTicket() {
      const tkt = this.tickets.slice(0, 1)
      return tkt
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
      return moment(a).format('H:mm')
    }
  }
}
</script>

<style scoped>
</style>
