import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createUserProfile} from './database';



export type AuthUser = FirebaseAuthTypes.User;

export interface AuthResult {
  user: AuthUser | null;
  error: string | null;
}

export async function signIn(
  email: string,
  password: string,
): Promise<AuthResult> {
  try {
    const credential = await auth().signInWithEmailAndPassword(email, password);
    return {user: credential.user, error: null};
  } catch (e: any) {
    return {user: null, error: mapAuthError(e.code)};
  }
}


export async function createAccount(
  name: string,
  email: string,
  password: string,
): Promise<AuthResult> {
  try {
    const credential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    // Save display name in Firebase Auth
    await credential.user.updateProfile({displayName: name});
    // Write user profile to Realtime Database under users/{uid}
    await createUserProfile({
      uid: credential.user.uid,
      name: name.trim(),
      email: email.trim(),
      createdAt: new Date().toISOString(),
    });
    return {user: credential.user, error: null};
  } catch (e: any) {
    return {user: null, error: mapAuthError(e.code)};
  }
}


export async function signOut(): Promise<void> {
  await auth().signOut();
}



export async function sendPasswordReset(email: string): Promise<string | null> {
  try {
    await auth().sendPasswordResetEmail(email);
    return null;
  } catch (e: any) {
    return mapAuthError(e.code);
  }
}



export function onAuthStateChanged(
  callback: (user: AuthUser | null) => void,
): () => void {
  return auth().onAuthStateChanged(callback);
}



function mapAuthError(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Try again later.';
    default:
      return 'Something went wrong. Please try again.';
  }
}
