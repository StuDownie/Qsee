<p align="center">
<img  src="https://imgur.com/XHtnKS4.png"  />
</p>

# Qsee

Realtime queue management system for busy offices - includes customer kiosk, agent screen and waiting room display using web speech API

**Static Site built with [Nuxt.js](https://nuxtjs.org/), [Firebase](https://firebase.google.com/) and [Buefy](https://buefy.org/)**

# **[DEMO SITE](https://waiting-room-c9c18.firebaseapp.com)**

<p align="center">
<img width="70%" src="https://i.imgur.com/jikuYpT.gif"  />
</p>

## Install

Clone repo, `cd` into directory, then -

```bash
$ npm install
```

### Setup Firebase

1.  [Create a Firebase project](https://firebase.google.com/)

2) Go to **Authentication** and set **Email/password** as your sign-in method

3.  [Create a Storage bucket](https://cloud.google.com/storage/docs/creating-buckets) (for adverts on the display screen)

4) From the project overview page in the [Firebase console](https://console.firebase.google.com/), click **Add Firebase to your web app** copy the config options and add them in the Qsee `/plugins/firebase.js` file

Now install Firebase tools to upload the application to Firebase

```bash
$ npm install -g firebase-tools
```

Connect Firebase Tools to your project

```bash
# Uses your browser to authorise...
$ firebase login


# Set your home directory to be called 'dist' when you run this
$ firebase init
```

## Secure Firebase

Go to **Firebase console > authentication** and create some email user accounts to access the app. Then add the below rules, and include the user ID from any accounts you created that you want to modify settings, or upload images to the display screen.

**Database rules**

```bash
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
			allow write: if request.auth.uid == 'ADMIN USER ID HERE';
    }
    match /{collection}/{document=**} {
			allow read;
			allow write: if int(collection[0]) - int(collection[0]) == 0 && request.auth != null
    }
  }
}
```

**Storage rules**

```bash
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if request.auth.uid == 'ADMIN USER ID HERE';
    }
  }
}
```

## Deploy

```bash
# build static site
npm run generate

# Deploy to Firebase
firebase deploy
```

Enjoy taking customers :+1:
