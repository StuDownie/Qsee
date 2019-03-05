<template>
  <div class="container">
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
        <stat-box title="Avg. wait" icon="mdi mdi-timer mdi-24px" :content="msToTime(avWait)"></stat-box>
      </div>
      <div class="column sameheight">
        <stat-box
          title="Longest wait"
          icon="mdi mdi-timer mdi-24px"
          :content="msToTime(longestWait)"
        ></stat-box>
      </div>
      <div class="column sameheight">
        <stat-box
          title="Avg. meeting"
          icon="mdi mdi-timelapse mdi-24px"
          :content="msToTime(avInteraction)"
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
          <section>
            <h2 class="title is-4">
              Today's tickets
              <button class="button is-primary is-pulled-right">
                <span class="icon">
                  <i class="mdi mdi-history mdi-24px"></i>
                </span>
                <span>History</span>
              </button>
            </h2>
          </section>
          <section class="section">
            <b-field grouped group-multiline>
              <div v-for="(value, key) in ticketsByDesk" :key="key" class="control">
                <b-taglist attached>
                  <b-tag type="is-dark">{{key}}</b-tag>
                  <b-tag type="is-primary">{{value}}</b-tag>
                </b-taglist>
              </div>
            </b-field>
          </section>

          <b-table
            :data="completedTickets"
            :default-sort-direction="defaultSortDirection"
            default-sort="id"
            striped
          >
            <template slot-scope="props">
              <b-table-column field="id" label="ID" sortable numeric centered>{{ props.row.id }}</b-table-column>
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
                >{{ msToTime(props.row.wait) }}</span>
              </b-table-column>
              <b-table-column field="interaction" label="Interaction" sortable numeric centered>
                <span class="tag is-primary">{{ msToTime(props.row.interaction) }}</span>
              </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { fireDb } from '~/plugins/firebase.js'

import StatBox from '@/components/dashboard/stat-box'
import ActiveTickets from '@/components/dashboard/active-tickets'

export default {
  components: { StatBox, ActiveTickets },
  data() {
    return {
      defaultSortDirection: 'asc',
      tickets: [],
      today: moment().format('D MMM YYYY')
    }
  },
  firestore() {
    return {
      tickets: fireDb.collection(this.today).orderBy('id')
    }
  },
  methods: {
    duration(time1, time2) {
      const start = moment(time1)
      const end = moment(time2)
      return moment.duration(end.diff(start)).humanize()
    },
    time(a) {
      return moment(a).format('H:mm')
    },
    msToTime(ms) {
      const mins = Math.floor(ms / 60000)
      const secs = ((ms % 60000) / 1000).toFixed(0)
      return mins + ':' + (secs < 10 ? '0' : '') + secs
    }
  },
  computed: {
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
    completedTickets() {
      return this.tickets.filter(x => x.state == 'seen')
    },
    waiting() {
      return this.tickets.filter(x => x.state == null)
    },
    atDesks() {
      return this.tickets.filter(x => x.state == 'called')
    },
    longestWait() {
      return this.tickets
        .filter(x => x.state == 'called' || x.state == 'seen')
        .map(x => x.wait)
        .reverse()
        .slice(0, 1)
    },
    avWait() {
      const total = this.tickets
        .filter(x => x.state == 'called' || x.state == 'seen')
        .map(x => x.wait)
        .reduce((acc, val) => acc + val, 100)
      return total / this.tickets.length
    },
    avInteraction() {
      const total = this.tickets
        .filter(x => x.state == 'seen')
        .map(x => x.interaction)
        .reduce((acc, val) => acc + val, 100)
      return total / this.tickets.length
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
