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

    public checkIfUserExists = (userId: string) => {
        return this.usersCollection.doc(userId)
            .get()
            .then(docSnapshot => {
                return docSnapshot.exists;
            })
            .catch(error => {
                return null
            })
    }

    public getUserData = async (userId: string) => {
        let user = await this.usersCollection.doc(userId).get();
        return user.data();
    }

    public getUserFriends = (userId: string) => {
        return this.followingCollection.doc(userId)
            .collection('/userFollowing')
            .where('isFollowing', '==', true)
            .get()
            .then(querySnapshot => {
                let data: string[] = querySnapshot.docs.map(documentSnapshot => {
                    return documentSnapshot.id;
                });
                return data
            })
            .catch(error => {
                let data: string[] = [];
                return data;
            })
    }

}