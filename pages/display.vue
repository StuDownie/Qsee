<template>
  <div v-cloak>
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
        <img
          v-show="adImage == ad.name"
          v-for="(ad, idx) in ads"
          :key="idx"
          :src="ad.link"
          :alt="ad.name"
          style="height:80vh; width:100%"
        >
        <div class="columns is-centered" style="z-index:-1; padding-top:15rem">
          <p class="title is-2">Looking for images...</p>
        </div>
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
      isLoading: true,
      tickets: [],
      settings: [],
      ads: [],
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
      settings: fireDb.collection('settings').doc('general'),
      ads: fireDb.collection('slideshow')
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
        t.adImage = t.ads[n].name
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
