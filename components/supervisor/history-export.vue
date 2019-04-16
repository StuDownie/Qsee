<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Download a report</p>
    </header>
    <section class="modal-card-body">
      <b-tabs ref="loading" v-model="activeTab" type="is-toggle" mobile-native expanded>
        <b-loading :is-full-page="false" :can-cancel="true"></b-loading>
        <b-tab-item label="Start date" icon="calendar">
          <b-datepicker
            v-model="start"
            inline
            :first-day-of-week="1"
            placeholder="Click to select..."
          ></b-datepicker>
        </b-tab-item>
        <b-tab-item label="End date" icon="calendar">
          <b-datepicker
            v-model="end"
            inline
            :first-day-of-week="1"
            placeholder="Click to select..."
          ></b-datepicker>
        </b-tab-item>
      </b-tabs>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Cancel</button>
      <button
        v-if="activeTab == 1"
        @click.prevent="exportReport(start, end)"
        class="button is-primary"
      >
        <b-icon icon="download"></b-icon>
        <span>Download</span>
      </button>
    </footer>
  </div>
</template>


<script>
import { fireDb } from '~/plugins/firebase.js'

export default {
  props: ['email', 'password'],
  data() {
    return {
      activeTab: 0,
      start: new Date(),
      end: new Date(),
      history: []
    }
  },
  firestore() {
    return {
      settings: fireDb.collection('settings').doc('general')
    }
  },
  computed: {
    historyExport() {
      const array = []
      for (let i = 0; this.history.length > i; i++) {
        const obj = {
          id: this.history[i].id,
          topic: this.history[i].topic,
          desk: this.history[i].desk,
          printed: this.JSDateToExcelDate(this.history[i].printed),
          timescalled: this.history[i].timescalled,
          seen: this.JSDateToExcelDate(this.history[i].seen),
          wait: this.duration(this.history[i].wait),
          completed: this.JSDateToExcelDate(this.history[i].completed),
          interaction: this.duration(this.history[i].interaction)
        }
        array.push(obj)
      }
      return array
    }
  },
  methods: {
    JSDateToExcelDate(inDate) {
      const date = new Date(inDate)
      const weekday = date.toLocaleDateString('en-US', { weekday: 'short' })
      const month = date.toLocaleDateString('en-US', { month: 'short' })
      const day = date.toLocaleDateString('en-US', { day: 'numeric' })
      const year = date.toLocaleDateString('en-US', { year: 'numeric' })
      const time = date.toLocaleTimeString('en-US', { hour12: false })
      return `${weekday} ${month} ${day} ${year} ${time}`
    },
    duration(ms) {
      const mins = Math.floor(ms / 60000)
      const secs = ((ms % 60000) / 1000).toFixed(0)
      return mins + ':' + (secs < 10 ? '0' : '') + secs
    },
    exportReport(startDate, endDate) {
      const dates = []
      const day = -1000 * 60 * 60 * 24
      let counter = startDate
      while (counter <= endDate) {
        let fireDate = new Date(counter).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
        dates.push(fireDate)
        counter = counter - day
      }
      for (var i = 0; i < dates.length; i++) {
        fireDb
          .collection(dates[i])
          .get()
          .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
              this.history.push(doc.data())
            })
          })
      }
      this.$loading.open({
        container: this.$refs.loading.$el
      })
      setTimeout(() => {
        this.downloadCSV({ filename: 'export.csv' })
      }, 1000)
      setTimeout(() => {
        this.$parent.close()
      }, 2000)
    },
    arrayToCSV(args) {
      var result, ctr, keys, columnDelimiter, lineDelimiter, data
      data = args.data || null
      if (data == null || !data.length) {
        return ' '
      }
      columnDelimiter = args.columnDelimiter || ','
      lineDelimiter = args.lineDelimiter || '\n'
      keys = Object.keys(data[0])
      result = ''
      result += keys.join(columnDelimiter)
      result += lineDelimiter
      data.forEach(function(item) {
        ctr = 0
        keys.forEach(function(key) {
          if (ctr > 0) result += columnDelimiter
          result += item[key]
          ctr++
        })
        result += lineDelimiter
      })
      return result
    },
    downloadCSV(args) {
      var data, filename, link
      var csv = this.arrayToCSV({
        data: this.historyExport
      })
      if (csv == null) return
      filename = args.filename || 'export.csv'
      if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv
      }
      data = encodeURI(csv)
      link = document.createElement('a')
      link.setAttribute('href', data)
      link.setAttribute('download', filename)
      link.click()
    }
  }
}
</script>

<style scoped>
</style>
