<template>
  <section v-cloak v-if="$store.state.user != 'logged-out'" class="section">
    <div class="has-text-right">
      <button class="button is-rounded" @click="settingsModalOn = !settingsModalOn">
        <span class="icon">
          <i class="mdi mdi-settings-outline mdi-24px"></i>
        </span>
        <span>Settings</span>
      </button>
    </div>

    <b-modal :active.sync="settingsModalOn" has-modal-card>
      <settings-modal></settings-modal>
    </b-modal>
    <br>

    <div class="columns">
      <div class="column">
        <nav-card
          title="Agent screen"
          link="/agent"
          icon="mdi mdi-comment-account-outline mdi-24px"
        ></nav-card>
      </div>
      <div class="column">
        <nav-card title="Waiting area display" link="/display" icon="mdi mdi-monitor mdi-24px"></nav-card>
      </div>
      <div class="column">
        <nav-card title="Kiosk" link="/kiosk" icon="mdi mdi-ticket-confirmation mdi-24px"></nav-card>
      </div>
      <div class="column">
        <nav-card
          title="Supervisor dashboard"
          link="/supervisor"
          icon="mdi mdi-view-dashboard mdi-24px"
        ></nav-card>
      </div>
    </div>
  </section>
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'

const NavCard = () => import('@/components/nav-card')
const SettingsModal = () => import('@/components/settings-modal')

export default {
  name: 'HomePage',
  components: { NavCard, SettingsModal },
  data() {
    return {
      settingsModalOn: false,
      settings: []
    }
  },
  firestore() {
    return {
      settings: fireDb.collection('settings').doc('general')
    }
  },
  created() {
    if (
      this.$store.state.user == 'logged-out' &&
      this.$store.state.signingOut == 'false'
    ) {
      this.$router.push('/login')
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.settings.office == null) {
        this.settingsModalOn = true
      }
    }, 500)
  }
}
</script>
