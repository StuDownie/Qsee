<template>
  <div v-if="next.length" class="box" style="width:100%">
    <span v-if="settings.takeCustomer == 1">
      <h1 v-for="tkt in nextNonPay" :key="tkt.id" class="title is-1 spacing">Next ticket: {{tkt.id}}</h1>
      <h1 v-for="tkt in nextPay" :key="tkt.id" class="title is-1 spacing">Next payment: {{tkt.id}}</h1>
    </span>
    <h1
      v-if="settings.takeCustomer != 1"
      v-for="tkt in next"
      :key="tkt.id"
      class="title is-1 spacing"
    >Next ticket: {{tkt.id}}</h1>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'

export default {
  data() {
    return {
      tickets: [],
      settings: [],
      today: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }
  },
  firestore() {
    return {
      tickets: fireDb.collection(this.today).orderBy('id', 'desc'),
      settings: fireDb.collection('settings').doc('general')
    }
  },
  computed: {
    nextPay() {
      const tkt = this.tickets
        .filter(
          x => x.topic == 'Payment' && x.state != 'seen' && x.state != 'called'
        )
        .slice(0, 1)
      return tkt
    },
    nextNonPay() {
      const tkt = this.tickets
        .filter(
          x => x.topic != 'Payment' && x.state != 'seen' && x.state != 'called'
        )
        .slice(0, 1)
      return tkt
    },
    next() {
      const tkt = this.tickets
        .filter(x => x.state != 'seen' && x.state != 'called')
        .slice(0, 1)
      return tkt
    }
  }
}
</script>

<style scoped>
</style>
