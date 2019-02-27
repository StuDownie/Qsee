<template>
  <div class="box">
    <p class="has-text-primary">
      <span class="icon">
        <i :class="icon"></i>
      </span>
      <span>
        <strong class="title is-6 has-text-primary">{{title}}</strong>
      </span>
    </p>
    <p class="title is-3">{{content}}</p>
  </div>
</template>

<script>
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
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
</style>
