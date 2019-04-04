<template>
  <div>
    <h1 class="title is-1 spacing" :class="{active: isActive}">{{ticket}} go to {{desk}}</h1>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'

export default {
  props: ['ticket', 'desk', 'called', 'accent'],
  data() {
    return {
      isActive: false,
      settings: []
    }
  },
  firestore() {
    return {
      settings: fireDb.collection('settings').doc('general')
    }
  },
  watch: {
    called: function() {
      this.speak(`Ticket ${this.ticket} please go to ${this.desk}`)
      this.isActive = !this.isActive
      setTimeout(() => {
        this.isActive = !this.isActive
      }, 4000)
    }
  },
  mounted() {
    this.isActive = !this.isActive
    this.speak(`Ticket ${this.ticket} please go to ${this.desk}`)
    setTimeout(() => {
      this.isActive = !this.isActive
    }, 4000)
  },
  methods: {
    speak(words) {
      const speechMessage = new SpeechSynthesisUtterance()
      const voices = window.speechSynthesis.getVoices()
      const chosenVoice = voices.filter(voice => voice.name == this.accent)
      if (chosenVoice.length === 1) {
        speechMessage.voice = chosenVoice[0]
      }
      speechMessage.rate = 0.8 // speed of narration (up to 10)
      speechMessage.text = words
      window.speechSynthesis.speak(speechMessage)
    }
  }
}
</script>

<style scoped>
.active {
  border-radius: 10px;
  background-color: gold;
}
.spacing {
  padding: 10px;
  margin-bottom: 10px;
}
</style>
