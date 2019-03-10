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
            <b-field label="Greeting">
              <b-input type="text" v-model="kioskGreeting" placeholder="Wording on kiosk"></b-input>
            </b-field>

            <b-field style="width:450px" label="Topics">
              <b-taginput
                type="is-primary"
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

          <b-tab-item label="Display" icon="monitor">
            <h2 class="title is-6">Voice</h2>
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
                  v-for="(voiceSelect, idx) in voicesUK"
                  :key="idx"
                  :value="voiceSelect.name"
                >{{voiceSelect.name}} ({{voiceSelect.lang}})</option>
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
      kioskGreeting: '',
      topics: [],
      takeCustomer: 1,
      synth: window.speechSynthesis,
      chosenVoice: '',
      voiceTypes: []
    }
  },
  firestore() {
    return {
      settings: fireDb.collection('settings').doc('general')
    }
  },
  computed: {
    voicesUK() {
      return this.voiceTypes.filter(x => x.lang.indexOf('en') >= 0)
    }
  },
  created() {
    // Build list of available voices for display screen
    this.voiceTypes = this.synth.getVoices()
    this.synth.onvoiceschanged = () => {
      this.voiceTypes = this.synth.getVoices()
    }
    // Replace default values from settings in Firebase
    setTimeout(() => {
      this.office = this.settings.office
      this.takeCustomer = this.settings.takeCustomer
      this.kioskGreeting = this.settings.kioskGreeting
      this.topics = this.settings.topics
      this.chosenVoice = this.settings.chosenVoice
    }, 500)
  },
  methods: {
    updateSettings() {
      const ref = fireDb.collection('settings').doc('general')
      const document = {
        office: this.office,
        kioskGreeting: this.kioskGreeting,
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
