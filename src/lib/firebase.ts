import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBd7ADR95FIJ-mDbGY77zqNYeP5DG6UclQ",
  authDomain: "natraj-electricals.firebaseapp.com",
  projectId: "natraj-electricals",
  storageBucket: "natraj-electricals.firebasestorage.app",
  messagingSenderId: "46999703506",
  appId: "1:46999703506:web:142100defd4b860dbe820b",
  measurementId: "G-G7BGNP5REG",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

let analytics: ReturnType<typeof getAnalytics> | null = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export const db = getFirestore(app);

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (analytics) {
    logEvent(analytics, eventName as never, params as never);
  }
}

export async function submitContactForm(data: {
  name: string;
  phone: string;
  email: string;
  message: string;
}) {
  const docRef = await addDoc(collection(db, "contact_submissions"), {
    ...data,
    createdAt: serverTimestamp(),
    source: "website",
  });
  return docRef.id;
}
