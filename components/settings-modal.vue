<template>
  <form action>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Settings</p>
      </header>
      <section class="modal-card-body">
        <b-tabs v-model="activeTab" type="is-boxed">
          <b-tab-item label="General" icon="settings-outline">
            <b-field label="Office name">
              <b-input type="text" v-model="office" placeholder="Office name"></b-input>
            </b-field>
          </b-tab-item>

          <b-tab-item label="Kiosk" icon="ticket-confirmation">
            <b-field style="width:450px" label="Topics on kiosk">
              <b-taginput
                type="is-dark"
                v-model="topics"
                ellipsis
                icon="label"
                placeholder="Add a topic"
              ></b-taginput>
            </b-field>
          </b-tab-item>

          <b-tab-item label="Agent" icon="comment-account-outline">
            <h2 class="title is-6">Set how agents take customers</h2>
            <div class="field">
              <b-radio
                v-model="takeCustomer"
                native-value="1"
              >Choose between next paying customer or next customer</b-radio>
            </div>
            <div class="field">
              <b-radio
                v-model="takeCustomer"
                native-value="2"
              >Take next ticket (regardless of topic)</b-radio>
            </div>
            <div class="field">
              <b-radio v-model="takeCustomer" native-value="3">Choose any waiting customer</b-radio>
            </div>
          </b-tab-item>

          <b-tab-item label="Display screen" icon="monitor">
            <h2 class="title is-6">Change voice style</h2>
            <b-field>
              <b-select
                v-model="chosenVoice"
                placeholder="Choose a voice"
                icon="voice"
                name="voice"
                id="voice"
                expanded
              >
                <option
                  v-for="(voiceSelect, idx) in voiceTypes"
                  :key="idx"
                  :value="voiceSelect"
                >{{voiceSelect}}</option>
              </b-select>
            </b-field>
          </b-tab-item>
        </b-tabs>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Cancel</button>
        <button @click.prevent="updateSettings" class="button is-primary">
          <b-icon icon="check"></b-icon>
          <span>Save</span>
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'

export default {
  data() {
    return {
      activeTab: 0,
      settings: [],
      office: '',
      topics: [],
      takeCustomer: 1,
      chosenVoice: '',
      voiceTypes: []
    }
  },
  firestore() {
    return {
      settings: fireDb.collection('settings').doc('general')
    }
  },
  created() {
    // Build list of available voices for display screen
    const voices = speechSynthesis.getVoices()
    for (var i = 0; i < voices.length; i++) {
      // Get English voices
      if (voices[i].lang.indexOf('en') >= 0) {
        this.voiceTypes.push(voices[i].name)
      }
    }
    // Replace all values from settings in Firebase
    setTimeout(() => {
      this.office = this.settings.office
      this.takeCustomer = this.settings.takeCustomer
      this.topics = this.settings.topics
      this.chosenVoice = this.settings.chosenVoice
    }, 500)
  },
  methods: {
    updateSettings() {
      const ref = fireDb.collection('settings').doc('general')
      const document = {
        office: this.office,
        topics: this.topics,
        takeCustomer: this.takeCustomer,
        chosenVoice: this.chosenVoice
      }
      ref.set(document)
      this.$parent.close()
    }
  }
}
</script>

<style scoped>
</style>
