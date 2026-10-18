/* Firebase configuration for ModernEducationApp.
   This web config is public by design. Protect data with Firebase Security Rules.
   Source: Firebase Console → Project settings → Your apps.
*/
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyC7IR2yj8kUlg3K6SvYiUVJn1okpxMoows",
  authDomain: "moderneduapp.firebaseapp.com",
  projectId: "moderneduapp",
  storageBucket: "moderneduapp.firebasestorage.app",
  messagingSenderId: "379846512462",
  appId: "1:379846512462:web:a581b49b68b7526c0c181f",
  measurementId: "G-Y324KCDGMZ"
};
window.FIREBASE_ENABLED = Boolean(
  window.FIREBASE_CONFIG.apiKey &&
  window.FIREBASE_CONFIG.authDomain &&
  window.FIREBASE_CONFIG.projectId &&
  window.FIREBASE_CONFIG.appId
);
