import * as Firebase from 'firebase';

export const firebase = new Firebase(process.env.FIREBASE_URL);
