importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDcdg_-8SLFdbm4-jOTLcj6StY3hT_9lkI",
  authDomain: "prompthub-b839b.firebaseapp.com",
  projectId: "prompthub-b839b",
  storageBucket: "prompthub-b839b.firebasestorage.app",
  messagingSenderId: "369629802808",
  appId: "1:369629802808:web:ef4b259c4098d8350111cd",
  measurementId: "G-6CFZ5JKC6S",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Background message:", payload);

  const notificationTitle =
    payload.notification?.title || "New Notification";

  const notificationOptions = {
    body: payload.notification?.body,
    icon: "/icon-192x192.png",
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});