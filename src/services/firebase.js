import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
export const loginWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const signupWithEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
export const subscribeToAuth = (callback) => onAuthStateChanged(auth, callback);

const savedRef = (uid, exerciseId) => doc(db, 'users', uid, 'savedExercises', exerciseId);

export const saveExercise = async (uid, exerciseId) => {
  await setDoc(savedRef(uid, exerciseId), {
    id: exerciseId,
    savedAt: serverTimestamp(),
  });
};

export const unsaveExercise = async (uid, exerciseId) => {
  await deleteDoc(savedRef(uid, exerciseId));
};

export const isExerciseSaved = async (uid, exerciseId) => {
  const snap = await getDoc(savedRef(uid, exerciseId));
  return snap.exists();
};

export const subscribeToSavedExerciseIds = (uid, callback) =>
  onSnapshot(collection(db, 'users', uid, 'savedExercises'), (snap) => {
    callback(snap.docs.map((d) => d.id));
  });
