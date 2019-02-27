<template>
  <div class="box">
    <p class="has-text-primary">
      <span class="icon">
        <i :class="icon"></i>
      </span>
      <span class="title is-4 has-text-primary">{{title}}</span>
    </p>
    <hr style="margin: 0px 0px 3rem;">
    {{content}}
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
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
</style>
