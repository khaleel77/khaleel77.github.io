// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCfnzeO1tsLmAMDL1DMdRs7H4nGsL6cGQE",
  authDomain: "ns-fcm.firebaseapp.com",
  databaseURL: "https://ns-fcm.firebaseio.com",
  projectId: "ns-fcm",
  storageBucket: "ns-fcm.appspot.com",
  messagingSenderId: "300116180541",
  appId: "1:300116180541:web:17376c4d4afc04a4817454",
  measurementId: "G-SMKCQH7132"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
const channel = new BroadcastChannel('sw-messages');
// Handle background messages (when your app is not in the foreground)
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: payload.data.icon || '/favicon.ico' // Or your custom icon
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
    

    
    channel.postMessage(payload.data.body);

   // saveValue('fcm.last', payload.data.body);

    self.addEventListener('notificationclick', function(event) {

      event.notification.close();
       if (!event.action) {
         
         channel.postMessage(payload.data.body);

        
         if(payload.data.url) clients.openWindow(payload.data.url);
         else if(isValidUrl(payload.data.body)) clients.openWindow(payload.data.body);
         else clients.openWindow("/?data="+payload.data.body); 
    // Was a normal notification click
    console.log('Notification Click.');
    return;
  }
         // 
         
    }, false);
  
    
});
