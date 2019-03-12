<template>
  <form action>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Download a report</p>
      </header>
      <section class="modal-card-body">
        <b-notification
          class="is-paddingless is-marginless has-background-white"
          ref="element"
          :closable="false"
        >
          <b-tabs v-model="activeTab" type="is-toggle" expanded>
            <b-tab-item label="Start date" icon="calendar">
              <b-field>
                <b-datepicker
                  v-model="start"
                  inline
                  :first-day-of-week="1"
                  placeholder="Click to select..."
                ></b-datepicker>
              </b-field>
            </b-tab-item>
            <b-tab-item label="End date" icon="calendar">
              <b-field>
                <b-datepicker
                  v-model="end"
                  inline
                  :first-day-of-week="1"
                  placeholder="Click to select..."
                ></b-datepicker>
              </b-field>
            </b-tab-item>
          </b-tabs>
        </b-notification>
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
  </form>
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'
import moment from 'moment'

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
  methods: {
    exportReport(startDate, endDate) {
      const dates = []
      const currDate = moment(startDate).startOf('day')
      const lastDate = moment(endDate).startOf('day')
      while (currDate.add(1, 'days').diff(lastDate) < 0) {
        dates.push(currDate.clone().format('D MMM YYYY'))
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
        container: this.$refs.element.$el
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
        return null
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
        data: this.history
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
