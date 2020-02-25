import admin from 'firebase-admin';

export interface Post{
    uid: string;
    title: string;
    description: string;
    postId: string;
    createdAt: admin.firestore.Timestamp;
    user: FirebaseFirestore.DocumentData
}