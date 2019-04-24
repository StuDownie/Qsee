<template>
  <div v-cloak v-if="$store.state.user != 'logged-out'" id="cases">
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li class="is-active">
          <a href="#" aria-current="page">{{$nuxt.$route.name}}</a>
        </li>
      </ul>
    </nav>
    <div v-if="withCustomer > 0" class="section has-text-centered">
      <h1 class="title is-2">You have a customer</h1>
      <h2 class="title is-4">Ticket {{withCustomer}} ({{withCustomerTopic}})</h2>
      <nav class="level">
        <div class="level-item has-text-centered">
          <button
            @click="callAgain"
            class="button is-danger is-large"
            :class="{'is-loading': called}"
          >Call customer again</button>
        </div>
        <div class="level-item has-text-centered">
          <button @click="newCustomer" class="button is-primary is-large">Take another customer</button>
        </div>
      </nav>
    </div>

    <div v-if="withCustomer == 0" class="columns">
      <div class="column">
        <transition name="page" mode="out-in">
          <desk-chooser v-if="$store.state.desk == ''"></desk-chooser>
          <take-customers
            v-else
            :agentCallStyle="settings.takeCustomer"
            :tickets="tickets"
            :desk="desk"
            :today="today"
          ></take-customers>
        </transition>
      </div>
      <!-- *************************** -->
      <!-- queue summary -->
      <!-- *************************** -->
      <div id="queue" class="column has-text-centered">
        <div class="box">
          <div>
            <span id="queueTotal">
              <h3
                class="title is-4"
              >Queue ({{waiting.length}} waiting | {{atDesks.length}} at desks)</h3>
            </span>
          </div>

          <div id="summaryBox">
            <br>
            <h3 v-if="waiting.length" class="title is-5 has-text-primary">Waiting customers</h3>
            <span v-for="ticket in waiting" :key="ticket.id">
              <span v-if="ticket.state != 'called' && ticket.state != 'seen'">
                {{ `${ticket.id} (${ticket.topic}) ${time(ticket.printed)}` }}
                <br>
              </span>
            </span>
            <br>
            <h3 v-if="atDesks.length" class="title is-5 has-text-primary">At desks</h3>
            <span v-for="ticket in atDesks" :key="ticket.id">
              <span v-if="ticket.state == 'called' && ticket.state != 'seen'">
                {{ `${ticket.id} (${ticket.topic}) ${time(ticket.printed)}` }}
                <br>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'

const DeskChooser = () => import('@/components/agent/desk-chooser')
const TakeCustomers = () => import('@/components/agent/take-customers')

export default {
  components: { DeskChooser, TakeCustomers },
  data() {
    return {
      activeTab: 0,
      tickets: [],
      settings: [],
      called: false,
      today: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }
  },
  firestore() {
    return {
      tickets: fireDb.collection(this.today).orderBy('id'),
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
  mounted() {
    if (localStorage.getItem('desk') != null) {
      this.$store.commit('SET_DESK', localStorage.getItem('desk'))
    }
  },
  computed: {
    desk() {
      return this.$store.state.desk
    },
    withCustomer() {
      const t = this
      const active = this.tickets
        .filter(x => x.desk == t.desk && x.state == 'called')
        .map(x => x.id)
      return +active
    },
    withCustomerTopic() {
      const t = this
      const topic = this.atDesks
        .filter(x => x.id == t.withCustomer)
        .map(x => x.topic)
      return topic[0]
    },
    customerCalledAt() {
      const t = this
      const calledTime = this.tickets
        .filter(x => x.desk == t.desk && x.state == 'called')
        .map(x => x.seen)
      return +calledTime
    },
    timesCustomerCalled() {
      const t = this
      const times = this.tickets
        .filter(x => x.desk == t.desk && x.state == 'called')
        .map(x => x.timescalled)
      return +times
    },
    waiting() {
      return this.tickets.filter(x => x.state == null)
    },
    atDesks() {
      return this.tickets.filter(x => x.state == 'called')
    }
  },
  methods: {
    newCustomer() {
      fireDb
        .collection(this.today)
        .doc(`${this.withCustomer}`)
        .set(
          {
            state: 'seen',
            completed: new Date().getTime(),
            interaction: new Date().getTime() - this.customerCalledAt
          },
          { merge: true }
        )
      return
    },
    callAgain() {
      this.called = true
      const calling = this.timesCustomerCalled + 1
      fireDb
        .collection(this.today)
        .doc(`${this.withCustomer}`)
        .set({ timescalled: calling }, { merge: true })
      setTimeout(() => {
        this.called = false
      }, 2000)
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
