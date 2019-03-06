<template>
  <div class="box">
    <p class="has-text-primary">
      <span class="icon">
        <i :class="icon"></i>
      </span>
      <span class="title is-4 has-text-primary">{{title}}</span>
    </p>
    <hr style="margin: 0px 0px 3rem;">

    <div v-for="ticket in content" :key="ticket.id">
      <span class="title is-5">Ticket {{ticket.id}} ({{ticket.topic}})</span>
      <em>{{time(ticket.printed)}}</em>
    </div>

    <div v-if="!content.length">No customers</div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  methods: {
    time(a) {
      return moment(a).format('H:mm')
    }
  }
}
</script>

<style scoped>
</style>
