/* Firebase bootstrap for GitHub Pages (HTTPS) using modular Firebase SDK. */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';
import { getAnalytics, isSupported } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-analytics.js';

const config = window.FIREBASE_CONFIG;
if (!window.FIREBASE_ENABLED || !config) {
  throw new Error('Firebase ще не налаштовано. Перевір js/firebase-config.js.');
}

export const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics is optional; unsupported browsers/privacy settings must not break the app.
export const analyticsReady = isSupported()
  .then(supported => supported ? getAnalytics(app) : null)
  .catch(error => {
    console.info('Firebase Analytics недоступна в цьому середовищі.', error);
    return null;
  });
