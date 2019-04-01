<template>
  <section class="hero is-fullheight has-background-white">
    <div class="columns is-centered">
      <section class="section gallerywidth">
        <progress v-show="progress" value="0" max="100" id="uploader"></progress>
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
        <div class="box is-clearfix has-background-light">
          <div style="display:inline-block; width:100%">
            <nuxt-link to="/">
              <button class="button is-success is-pulled-right">
                <span class="icon">
                  <i class="mdi mdi-check"></i>
                </span>
                <span>Done</span>
              </button>
            </nuxt-link>
          </div>
          <div v-for="(pic, idx) in pics" :key="idx" class="responsive">
            <div class="gallery card">
              <img :src="pic.link" :alt="pic.name">
              <button @click="deletePic(pic.name)" class="button is-small is-danger">
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { fireDb, fireStorage } from '~/plugins/firebase.js'

export default {
  layout: 'display',
  data() {
    return {
      pics: [],
      progress: false
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
      const t = this
      task.on(
        'state_changed',
        function progress(snapshot) {
          t.progress = true
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
            t.progress = false
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
.gallerywidth {
  width: 40rem;
}
.gallery {
  padding: 5px;
}
div.gallery img {
  width: 100%;
  height: auto;
}

* {
  box-sizing: border-box;
}

.responsive {
  padding: 5px;
  float: left;
  width: 23%;
  margin: 5px;
}

@media only screen and (max-width: 800px) {
  .gallerywidth {
    width: auto;
  }
  .responsive {
    width: 100%;
  }
}
</style>
