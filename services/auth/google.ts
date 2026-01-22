import { GoogleAuthProvider, signInWithPopup, type UserCredential } from "firebase/auth";

import { auth } from "@/services/firebase";

const googleProvider = new GoogleAuthProvider();

export async function signInWithGooglePopup(): Promise<UserCredential> {
  return await signInWithPopup(auth, googleProvider);
}
