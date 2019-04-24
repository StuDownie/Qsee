<template>
  <div v-cloak class="container">
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
    <!-- *************************** -->
    <!-- top summary -->
    <!-- *************************** -->
    <div class="columns has-text-centered">
      <div class="column sameheight">
        <stat-box title="Waiting" icon="mdi mdi-face mdi-24px" :content="waiting.length"></stat-box>
      </div>
      <div class="column sameheight">
        <stat-box
          title="At desks"
          icon="mdi mdi-comment-account-outline mdi-24px"
          :content="atDesks.length"
        ></stat-box>
      </div>
      <div class="column sameheight">
        <stat-box
          title="Tickets"
          icon="mdi mdi-ticket-confirmation mdi-24px"
          :content="tickets.length"
        ></stat-box>
      </div>
      <div class="column sameheight">
        <stat-box title="Avg. wait" icon="mdi mdi-timer mdi-24px" :content="duration(avWait)"></stat-box>
      </div>
      <div class="column sameheight">
        <stat-box
          title="Longest wait"
          icon="mdi mdi-timer mdi-24px"
          :content="duration(longestWait)"
        ></stat-box>
      </div>
      <div class="column sameheight">
        <stat-box
          title="Avg. meeting"
          icon="mdi mdi-timelapse mdi-24px"
          :content="duration(avInteraction)"
        ></stat-box>
      </div>
    </div>
    <div class="columns">
      <!-- *************************** -->
      <!-- left-side: active ticket details -->
      <!-- *************************** -->
      <div class="column">
        <active-tickets title="Waiting customers" icon="mdi mdi-face mdi-24px" :content="waiting"></active-tickets>
        <active-tickets
          title="At desks"
          icon="mdi mdi-comment-account-outline mdi-24px"
          :content="atDesks"
        ></active-tickets>
      </div>
      <!-- *************************** -->
      <!-- right side: agent history -->
      <!-- *************************** -->
      <div class="column">
        <div class="box">
          <nav class="level">
            <div class="level-left">
              <h2 class="title is-4">Today's tickets</h2>
            </div>
            <div class="level-right">
              <button @click="exportModalOn = !exportModalOn" class="button is-primary">
                <span class="icon">
                  <i class="mdi mdi-history mdi-24px"></i>
                </span>
                <span>History</span>
              </button>
              <b-modal :active.sync="exportModalOn" has-modal-card>
                <history-export></history-export>
              </b-modal>
            </div>
          </nav>
          <nav class="level">
            <b-field grouped group-multiline>
              <div v-for="(value, key) in ticketsByDesk" :key="key" class="control">
                <b-taglist attached>
                  <b-tag type="is-dark">{{key}}</b-tag>
                  <b-tag type="is-primary">{{value}}</b-tag>
                </b-taglist>
              </div>
            </b-field>
          </nav>

          <b-table
            :data="todaysTickets"
            :default-sort-direction="defaultSortDirection"
            default-sort="printed"
            striped
          >
            <template slot-scope="props">
              <b-table-column field="ticket" label="#" centered>{{ props.row.id }}</b-table-column>
              <b-table-column field="topic" label="Topic" sortable>{{ props.row.topic }}</b-table-column>
              <b-table-column
                field="desk"
                label="Desk"
                sortable
                numeric
                centered
              >{{ props.row.desk }}</b-table-column>
              <b-table-column field="printed" label="Arrival" sortable centered>
                <span class="tag is-primary">{{ time(props.row.printed) }}</span>
              </b-table-column>
              <b-table-column field="wait" label="Wait" sortable numeric centered>
                <span
                  class="tag"
                  :class="[parseInt(props.row.wait) > (9*60000) ? 'is-danger' : 'is-primary']"
                >{{ duration(props.row.wait) }}</span>
              </b-table-column>
              <b-table-column field="interaction" label="Meeting" sortable numeric centered>
                <span class="tag is-primary">{{ duration(props.row.interaction) }}</span>
              </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'

const StatBox = () => import('@/components/supervisor/stat-box')
const ActiveTickets = () => import('@/components/supervisor/active-tickets')
const HistoryExport = () => import('@/components/supervisor/history-export')

export default {
  components: { StatBox, ActiveTickets, HistoryExport },
  data() {
    return {
      defaultSortDirection: 'asc',
      tickets: [],
      exportModalOn: false,
      today: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }
  },
  firestore() {
    return {
      tickets: fireDb.collection(this.today).orderBy('id')
    }
  },
  methods: {
    time(a) {
      return new Date(a).toLocaleTimeString('en-GB', {
        hour: 'numeric',
        minute: 'numeric'
      })
    },
    duration(ms) {
      const mins = Math.floor(ms / 60000)
      const secs = ((ms % 60000) / 1000).toFixed(0)
      return mins + ':' + (secs < 10 ? '0' : '') + secs
    }
  },
  computed: {
    waiting() {
      return this.tickets.filter(x => x.state == null)
    },
    atDesks() {
      return this.tickets.filter(x => x.state == 'called')
    },
    avWait() {
      const total = this.tickets
        .filter(x => x.state == 'called' || x.state == 'seen')
        .map(x => x.wait)
        .reduce((acc, val) => acc + val, 0)
      const divisor = this.tickets.length ? this.tickets.length : 1
      return total / divisor
    },
    longestWait() {
      return this.tickets
        .filter(x => x.state == 'called' || x.state == 'seen')
        .map(x => x.wait)
        .sort((a, b) => {
          return b - a
        })
        .slice(0, 1)
    },
    avInteraction() {
      const total = this.tickets
        .filter(x => x.state == 'seen')
        .map(x => x.interaction)
        .reduce((acc, val) => acc + val, 0)
      const divisor = this.tickets.length ? this.tickets.length : 1
      return total / divisor
    },
    ticketsByDesk() {
      return this.tickets
        .filter(x => x.state == 'seen')
        .map(x => x.desk)
        .reduce((desks, desk) => {
          const count = desks[desk] || 0
          desks[desk] = count + 1
          return desks
        }, {})
    },
    todaysTickets() {
      return this.tickets.filter(x => x.state == 'seen')
    }
  }
}
</script>

<style scoped>
.sameheight {
  display: inline-flex;
}
.sameheight > div {
  width: 100%;
}
</style>
