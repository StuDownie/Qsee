<template>
  <div class="box">
    <h2 class="title is-4">Next customer</h2>
    <b-tabs v-model="activeTab" type="is-boxed">
      <b-tab-item label="Non-payments" icon="home">
        <span
          v-if="nextTicket.length"
          v-for="(tkt, index) in nextTicket"
          :key="index"
          class="has-text-centered"
        >
          <h2 class="title is-4">Ticket {{tkt.id}}</h2>
          <h3 class="title is-5">{{tkt.topic}}</h3>
          <p class="has-text-centered">{{tkt.printed}}</p>
          <hr>
          <p class="has-text-centered">
            <button @click="takeCustomer(tkt.id)" class="button is-primary">
              <span>Take this customer</span>
            </button>
          </p>
        </span>
        <span v-if="!nextTicket.length" class="has-text centered">No customers waiting</span>
      </b-tab-item>
      <b-tab-item label="Payments" icon="cash">
        <span
          v-if="nextPayment.length"
          v-for="(pay, index) in nextPayment"
          :key="index"
          class="has-text-centered"
        >
          <h2 class="title is-4">Ticket {{pay.id}}</h2>
          <p class="has-text-centered">{{pay.printed}}</p>
          <hr>
          <p class="has-text-centered">
            <button @click="takeCustomer(pay.id)" class="button is-primary">
              <span>Take this customer</span>
            </button>
          </p>
        </span>
        <span v-if="!nextPayment.length" class="has-text centered">No payments waiting</span>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'

export default {
  props: ['tickets', 'desk', 'today'],
  computed: {
    nextTicket() {
      const tkt = this.tickets
        .filter(function(x) {
          return x.topic != 'Payment' && x.state != 'seen'
        })
        .slice(0, 1)
      return tkt
    },
    nextPayment() {
      const tkt = this.tickets
        .filter(function(x) {
          return x.topic == 'Payment' && x.state != 'seen'
        })
        .slice(0, 1)
      return tkt
    }
  },
  methods: {
    takeCustomer(ticket) {
      fireDb
        .collection(this.today)
        .doc(ticket)
        .set(
          { state: 'called', desk: this.desk, timescalled: 1 },
          { merge: true }
        )
      return
    }
  }
}
</script>

<style scoped>
</style>
