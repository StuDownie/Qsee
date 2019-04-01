<p align="center">
<img  src="https://imgur.com/XHtnKS4.png"  />
</p>

# Qsee

Realtime queue management system for busy offices - includes customer kiosk, agent screen and waiting room display using web speech API

Static Site built with Nuxt.js and Firebase

**[DEMO SITE](https://waiting-room-c9c18.firebaseapp.com)**

<p align="center">
  <img src="https://media.giphy.com/media/7J26pROewrT851tbqa/giphy.gif" />
</p>

## Install

Clone repo, `cd` into directory, then -

```bash
$ npm install
```

### Setup Firebase

1.  [Create a Firebase project](https://firebase.google.com/)

2) Go to **Authentication** and setup **Email/password** as your sign-in method

3.  [Create a Storage bucket](https://cloud.google.com/storage/docs/creating-buckets) (for adverts on the display screen)

4) From the project overview page in the [Firebase console](https://console.firebase.google.com/), click **Add Firebase to your web app** and copy the config options then add them in the Qsee `/plugins/firebase.js` file

Now install Firebase tools to upload the application to Firebase

```bash
$ npm install -g firebase-tools
```

Connect Firebase Tools to your project

```bash
$ firebase login


# cd into Qsee directory if you haven't already, then run this command
# and set your home directory to be called 'dist'

$ firebase init
```

## Deploy

```bash
# build static site
npm run generate

# Deploy to Firebase
firebase deploy
```

Enjoy taking customers :+1:
