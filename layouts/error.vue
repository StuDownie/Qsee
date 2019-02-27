<template>
  <div class="container">
    <h1 class="title is-2" v-if="error.statusCode === 404">Page not found</h1>
    <h1 class="title is-2" v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error']
  // you can set a custom layout for the error page...
  //   layout: 'blog'
}
</script>
