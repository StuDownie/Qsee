<template>
  <div>
    <section v-if="settings.office" class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="columns">
          <div class="column">
            <h1 class="title is-1">{{settings.office}}</h1>
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
        <div class="is-pulled-left">
          <span v-for="tkt in called" :key="tkt.id">
            <called-ticket
              :ticket="tkt.id"
              :desk="tkt.desk"
              :called="tkt.timescalled"
              :accent="settings.chosenVoice"
            ></called-ticket>
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
import { fireDb } from '~/plugins/firebase.js'

import CalledTicket from '@/components/display/called-ticket'

export default {
  layout: 'display',
  components: { CalledTicket },
  data() {
    return {
      tickets: [],
      settings: [],
      today: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      clock:
        new Date().toLocaleDateString('en-GB', {
          weekday: 'long',
          month: 'short',
          day: 'numeric'
        }) +
        ' ' +
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
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
    called() {
      return this.tickets.filter(x => x.state == 'called')
    }
  },
  mounted() {
    const t = this
    setInterval(function() {
      t.clock =
        new Date().toLocaleDateString('en-GB', {
          weekday: 'long',
          month: 'short',
          day: 'numeric'
        }) +
        ' ' +
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        })
    }, 1000)
  }
}
</script>

<style scoped>
</style>
