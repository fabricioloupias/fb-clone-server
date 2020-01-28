import admin from 'firebase-admin';
import { Request, Response } from 'express';
import { User } from '../models/user.model';

export class UserService {
    private db = admin.firestore();
    private userCollection = this.db.collection('/users');

    public saveUserInDB = (user: admin.auth.UserRecord) => {
        return this.userCollection.doc(user.uid)
            .set({
                displayName: user.displayName,
                email: user.email
            })
    }

}