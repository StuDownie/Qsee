<template>
  <div class="card">
    <header class="card-header">
      <nuxt-link :to="link">
        <p class="card-header-title has-text-grey">{{ title }}</p>
      </nuxt-link>
    </header>
    <div class="card-content">
      <div class="content has-text-centered">
        <nuxt-link :to="link">
          <b-icon :icon="icon" size="is-large" type="is-primary"/>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    title: String,
    link: String
  }
}
</script>

<style scoped>
</style>
