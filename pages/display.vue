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
              <h1 class="title is-1 has-text-right">{{clock}}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="section columns is-paddingless is-marginless">
      <div class="column is-one-third has-text-centered">
        <next-customers></next-customers>
        <span v-for="tkt in called" :key="tkt.id">
          <called-ticket
            :ticket="tkt.id"
            :desk="tkt.desk"
            :called="tkt.timescalled"
            :accent="settings.chosenVoice"
          ></called-ticket>
        </span>
      </div>
      <div class="column is-paddingless is-marginless">
        <img :src="adImage" alt=" " style="height:80vh; width:100%">
      </div>
    </div>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'

import NextCustomers from '@/components/display/next-customers'
import CalledTicket from '@/components/display/called-ticket'

export default {
  layout: 'display',
  components: { CalledTicket, NextCustomers },
  data() {
    return {
      tickets: [],
      settings: [],
      ads: [
        'https://firebasestorage.googleapis.com/v0/b/waiting-room-c9c18.appspot.com/o/Slide01.JPG?alt=media&token=47d3f412-c2e3-4f2f-977a-0018e154be8e',
        'https://firebasestorage.googleapis.com/v0/b/waiting-room-c9c18.appspot.com/o/Slide03.JPG?alt=media&token=cd2463c2-7b83-4c78-a8a3-c07c3aa96b25',
        'https://firebasestorage.googleapis.com/v0/b/waiting-room-c9c18.appspot.com/o/Slide06.JPG?alt=media&token=ff47196b-e646-4144-855c-8d433dba7d5c'
      ],
      adImage: '',
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
    var n = 1
    this.adImage = this.ads[0]
    setInterval(function() {
      if (n < t.ads.length) {
        t.adImage = t.ads[n]
        n += 1
      }
      if (n == t.ads.length) n = 0
    }, 5000)
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
