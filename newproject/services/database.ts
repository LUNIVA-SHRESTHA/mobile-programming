import database from '@react-native-firebase/database';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  createdAt: string;
}

// ─── Write user profile on registration ──────────────────────────────────────

export async function createUserProfile(
  profile: UserProfile,
): Promise<void> {
  await database()
    .ref(`/users/${profile.uid}`)
    .set({
      name: profile.name,
      email: profile.email,
      createdAt: profile.createdAt,
    });
}

// ─── Read user profile ────────────────────────────────────────────────────────

export async function getUserProfile(
  uid: string,
): Promise<UserProfile | null> {
  const snapshot = await database().ref(`/users/${uid}`).once('value');
  if (!snapshot.exists()) {
    return null;
  }
  return {uid, ...snapshot.val()} as UserProfile;
}

// ─── Update user profile fields ───────────────────────────────────────────────

export async function updateUserProfile(
  uid: string,
  updates: Partial<Omit<UserProfile, 'uid' | 'createdAt'>>,
): Promise<void> {
  await database().ref(`/users/${uid}`).update(updates);
}

// ─── Fetch all registered users ───────────────────────────────────────────────

export async function getAllUsers(): Promise<UserProfile[]> {
  const snapshot = await database().ref('/users').once('value');
  if (!snapshot.exists()) {
    return [];
  }
  const data = snapshot.val();
  return Object.keys(data).map(uid => ({
    uid,
    name: data[uid].name || '',
    email: data[uid].email || '',
    createdAt: data[uid].createdAt || '',
  }));
}
