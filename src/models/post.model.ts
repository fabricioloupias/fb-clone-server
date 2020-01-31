import admin from 'firebase-admin';

export interface Post{
    uid: string;
    title: string;
    description: string;
    userId: string;
    createdAt: admin.firestore.Timestamp;
}