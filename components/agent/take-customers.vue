<template>
  <div>
    <button class="button is-pulled-right is-small" @click="clearDesk">Change desk</button>
    <next-payornot v-if="agentCallStyle == 1" :tickets="tickets" :desk="desk" :today="today"></next-payornot>
    <next-customer v-if="agentCallStyle == 2" :tickets="tickets" :desk="desk" :today="today"></next-customer>
    <any-customer v-if="agentCallStyle == 3" :tickets="tickets" :desk="desk" :today="today"></any-customer>
  </div>
</template>

<script>
const NextPayornot = () =>
  import('@/components/agent/call-styles/next-payornot')
const NextCustomer = () =>
  import('@/components/agent/call-styles/next-customer')
const AnyCustomer = () => import('@/components/agent/call-styles/any-customer')

export default {
  components: { NextPayornot, NextCustomer, AnyCustomer },
  props: ['agentCallStyle', 'tickets', 'desk', 'today'],
  methods: {
    clearDesk() {
      this.$store.commit('SET_DESK', '')
      localStorage.setItem('desk', '')
    }
  }
}
</script>

<style scoped>
</style>
