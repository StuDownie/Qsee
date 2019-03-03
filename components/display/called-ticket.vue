<template>
  <div>
    <h1 class="title is-2">Ticket {{ticket}} go to {{desk}}</h1>
  </div>
</template>

<script>
export default {
  props: ['ticket', 'desk', 'called'],
  watch: {
    called: function() {
      this.speak(`Ticket ${this.ticket} go to ${this.desk}`)
    }
  },
  mounted() {
    this.speak(`Ticket ${this.ticket} go to ${this.desk}`)
  },
  methods: {
    speak(words) {
      const speechMessage = new SpeechSynthesisUtterance()
      const voices = window.speechSynthesis.getVoices()
      const chosenVoice = voices.filter(voice => voice.name == 'Moira')
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
</style>
