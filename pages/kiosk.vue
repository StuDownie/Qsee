<template>
  <div>
    <h1 v-if="settings.topics" class="title is-2 has-text-centered">{{settings.kioskGreeting}}</h1>
    <nav class="level">
      <div
        v-for="(button, index) in settings.topics"
        :key="index"
        class="level-item has-text-centered widerbuttons"
      >
        <button
          class="button is-fullwidth is-primary is-large"
          @click="printTicket(button)"
        >{{button}}</button>
      </div>
    </nav>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'

export default {
  layout: 'kiosk',
  data() {
    return {
      today: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      tickets: [],
      settings: []
    }
  },
  firestore() {
    return {
      tickets: fireDb.collection(this.today).orderBy('id', 'desc'),
      settings: fireDb.collection('settings').doc('general')
    }
  },
  methods: {
    printTicket(clickedButton) {
      let newTicket = 0
      // Get latest ticket number and increment
      this.tickets.length
        ? (newTicket = +this.tickets[0].id + 1)
        : (newTicket = 1)
      // Save new ticket in Firebase
      const ref = fireDb.collection(this.today).doc(`${newTicket}`)
      const document = {
        id: newTicket,
        topic: clickedButton,
        printed: new Date().getTime()
      }
      ref.set(document)
      //  Print ticket
      var printWindow = window.open('', 'Print', 'height=600,width=800')
      printWindow.document.write(`
          <html>
          <head><title>Print</title></head>
          </body>
          Ticket ${newTicket}
          </body>
          </html>
      `)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
      printWindow.close()
      return true
    }
  }
}
</script>

<style scoped>
.widerbuttons {
  display: flex;
  justify-content: space-around;
}
button {
  width: 100%;
  margin: 5px;
}
</style>
