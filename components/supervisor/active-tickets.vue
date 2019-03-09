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
export default {
  props: {
    icon: String,
    title: String,
    content: Array
  },
  methods: {
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
