import admin from 'firebase-admin';
import { SearchIndex, SearchClient } from 'algoliasearch';
import algoliasearch from 'algoliasearch';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

export class UserService {
    private db = admin.firestore();
    private usersCollection = this.db.collection('/users');
    private followingCollection = this.db.collection('/following');
    private algoliaClient: SearchClient
    private algoliaIndex: SearchIndex;

    constructor() {
        this.algoliaClient = this.initializeAlgolia();
        this.algoliaIndex = this.algoliaClient.initIndex('clone_fb_users_search');
    }

    public saveUserInDB = (user: admin.auth.UserRecord) => {
        let newUser: FirebaseFirestore.DocumentData = {
            uid: user.uid,
            displayName: user.displayName || null,
            email: user.email || null,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber || null,
            photoURL: user.photoURL || null,
            disabled: user.disabled,
        }
        return this.usersCollection.doc(user.uid)
            .set(newUser);
    }

    public saveUserInAlgolia = (user: admin.auth.UserRecord) => {
        if (user)
            return this.algoliaIndex.saveObject({ objectID: user.uid, ...user })
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

    public searchUser = async (req: Request, res: Response) => {
        const { searchWords } = req.body;
        try {
            const { hits } = await this.algoliaIndex.search(searchWords)
            if (hits) {
                return res.send({ hits })
            }
            res.send({
                message: 'User not found'
            })
        } catch (error) {
            console.log(error);
            res.send({
                message: 'Error while trying search user'
            })
        }

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

    private initializeAlgolia() {
        return algoliasearch(`${process.env.ALGOLIA_APP_ID}`, `${process.env.ALGOLIA_ADMIN_KEY}`);
    }

}