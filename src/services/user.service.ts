import admin from 'firebase-admin';
import { Request, Response } from 'express';

export class UserService {
    private db = admin.firestore();
    private usersCollection = this.db.collection('/users');
    private followingCollection = this.db.collection('/following');

    public saveUserInDB = (user: admin.auth.UserRecord) => {
        return this.usersCollection.doc(user.uid)
            .set(user)
    }

    public getUserFriends = (userId: string) => {
        return this.followingCollection.doc(userId)
            .collection('/userFollowing')
            .where('isFollowing', '==', true)
            .get()
            .then(querySnapshot => {
                var data: string[] = querySnapshot.docs.map(documentSnapshot => {
                    return documentSnapshot.id;
                });
                return data
            })
    }

}