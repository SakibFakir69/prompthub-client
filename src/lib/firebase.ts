
import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: "prompthub-b839b.firebaseapp.com",
  projectId: "prompthub-b839b",
  // storageBucket: "prompthub-b839b.appspot.com",
  storageBucket: "prompthub-b839b.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export async function initMessaging() {
  const supported = await isSupported();
  if (!supported) return null;
  return getMessaging(app);
}

export async function requestNotificationPermission(): Promise<string | null> {
  try {
    const messaging = await initMessaging();
    if (!messaging) return null;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
      serviceWorkerRegistration: registration,
    });

    return token;
  } catch (err) {
    console.error("FCM token error:", err);
    return null;
  }
}

export async function listenForegroundMessages(callback: (payload: any) => void) {
  const messaging = await initMessaging();
  if (!messaging) return;
  onMessage(messaging, callback);
}