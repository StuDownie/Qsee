<template>
  <div>
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="columns">
          <div class="column">
            <h1 class="title is-1">Inverness Service Point</h1>
          </div>
          <div class="column">
            <div id="dateAndTimeDisplay">
              <!-- <span id="logo"><img src="./style/logowhite.gif" style="height:80px" alt=" "></span> -->
              <h1 class="title is-1 has-text-right">{{today}}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="section columns">
      <div class="column is-one-third">
        <div id="goToDesk" class="is-pulled-left">
          <h1 class="title is-2">Ticket 1 go to Desk 5</h1>
        </div>
      </div>
      <div class="column">
        <div id="slideshow" class="is-pulled-right">
          <div>
            <img src="#" alt=" " style="height:89%; width:100%">
          </div>'
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  layout: 'display',
  computed: {
    today() {
      return moment().format('dddd D MMM h:mm a')
    }
  }
}
</script>

<style scoped>
</style>
