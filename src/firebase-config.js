const config = {
  apiKey: "AIzaSyD2BEpxsr_UNDOWVpHiOduuBQdvV2k9nmo",
  authDomain: "bounty-hunter-bd424.firebaseapp.com",
  projectId: "bounty-hunter-bd424",
  storageBucket: "bounty-hunter-bd424.appspot.com",
  messagingSenderId: "738012812043",
  appId: "1:738012812043:web:b52847cb002ac47288c80e"
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}