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
  created() {
    if (
      this.$store.state.user == 'logged-out' &&
      this.$store.state.signingOut == 'false'
    ) {
      this.$router.push('/login')
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
            <head>
              <style>
              .printme {
                display: block;
                position: absolute;
                left: 0px;
                top: 0px;	
              }
              @page {
                margin-left: 30px;
                margin-right: 0px;
                margin-top: 0px;
                margin-bottom: 0px;
              }	         
              </style>
            </head>
            </body>
              <div class="printme">
                <p style="font-size: 1.24em;"><strong> Ticket ${newTicket} </strong></p>
              </div>
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
