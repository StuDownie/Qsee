<template>
  <div>
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="columns">
          <div class="column">
            <h1 class="title is-1">Inverness Service Point</h1>
          </div>
          <div class="column">
            <div id="dateAndTimeDisplay">
              <!-- <span id="logo"><img src="./style/logowhite.gif" style="height:80px" alt=" "></span> -->
              <h1 class="title is-1 has-text-right">{{clock}}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="section columns">
      <div class="column is-one-third">
        <div id="goToDesk" class="is-pulled-left">
          <span v-for="tkt in called" :key="tkt">
            <h1 class="title is-2">Ticket {{tkt.id}} go to {{tkt.desk}}</h1>
          </span>
        </div>
      </div>
      <div class="column">
        <div id="slideshow" class="is-pulled-right">
          <div>
            <img src="#" alt=" " style="height:89%; width:100%">
          </div>'
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { fireDb } from '~/plugins/firebase.js'

export default {
  layout: 'display',
  data() {
    return {
      tickets: [],
      today: moment().format('D MMM YYYY'),
      clock: moment().format('dddd D MMM h:mm a')
    }
  },
  firestore() {
    return {
      tickets: fireDb.collection(this.today).orderBy('id')
    }
  },
  computed: {
    called() {
      const wait = this.tickets.filter(x => x.state == 'called')
      return wait
    }
  },
  watch: {
    called: function(val) {
      alert(JSON.stringify(val))
    }
  },
  mounted() {
    const t = this
    setInterval(function() {
      t.clock = moment().format('dddd D MMM h:mm a')
    }, 1000)
  }
}
</script>

<style scoped>
</style>
