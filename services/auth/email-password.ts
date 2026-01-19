import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    type UserCredential,
} from "firebase/auth";

import { auth } from "@/services/firebase";

export async function signInWithEmail(
    email: string,
    password: string
): Promise<UserCredential> {
    return await signInWithEmailAndPassword(auth, email, password);
}

export async function signUpWithEmail(
    email: string,
    password: string
): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(auth, email, password);
}

export async function sendPasswordReset(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
}
