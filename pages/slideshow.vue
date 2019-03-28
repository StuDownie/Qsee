<template>
  <div>
    <section class="section">
      <nuxt-link to="/">
        <button class="button is-rounded is-pulled-right">
          <span class="icon">
            <i class="mdi mdi-check mdi-24px"></i>
          </span>
          <span>Done</span>
        </button>
      </nuxt-link>

      <progress value="0" max="100" id="uploader"></progress>
      <br>
      <div class="file">
        <label class="file-label">
          <input
            class="file-input"
            accept="image/*"
            type="file"
            value="upload"
            @change="upload(file, $event)"
          >
          <span class="file-cta">
            <span class="file-icon">
              <i class="mdi mdi-upload mdi-24px"></i>
            </span>
            <span class="file-label">Upload a file…</span>
          </span>
        </label>
      </div>
      <br>
      <br>
      <div class="box" style="display:flex; width:100%">
        <div v-for="(pic, idx) in pics" :key="idx">
          <img :src="pic.link" style="width:150px" alt=" ">
          <br>
          <button @click="deletePic(pic.name)" class="button is-small is-danger">Delete</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { fireDb, fireStorage } from '~/plugins/firebase.js'

export default {
  layout: 'display',
  data() {
    return {
      pics: []
    }
  },
  firestore() {
    return {
      pics: fireDb.collection('slideshow')
    }
  },
  methods: {
    upload(file, e) {
      e.preventDefault()
      const uploader = document.getElementById('uploader')
      let getFile = e.target.files[0]
      let storageRef = fireStorage.ref(getFile.name)
      let task = storageRef.put(getFile)
      task.on(
        'state_changed',
        function progress(snapshot) {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          uploader.value = percentage
        },
        function error(err) {
          console.log(err)
        },
        function complete() {
          storageRef.getDownloadURL().then(url => {
            const ref = fireDb.collection('slideshow').doc(`${getFile.name}`)
            const document = {
              link: url,
              name: getFile.name
            }
            ref.set(document)
            uploader.value = 0
          })
        }
      )
    },
    deletePic(name) {
      fireStorage.ref(name).delete()
      fireDb
        .collection('slideshow')
        .doc(name)
        .delete()
    }
  }
}
</script>

<style scoped>
</style>
