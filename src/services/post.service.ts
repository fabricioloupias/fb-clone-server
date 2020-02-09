import admin from 'firebase-admin';
import { Request, Response } from 'express';
import { Post } from '../models/post.model';
import { UserService } from './user.service';

export class PostService {
    private db = admin.firestore();
    private postCollection = this.db.collection('/posts');
    private userService: UserService = new UserService();

    public getPosts = async (req: Request, res: Response) => {
        let data: any[] = []
        try {
            const userFriendsIds = await this.userService.getUserFriends(req.body.userId);
            const ownUserPosts = await this.getPostsByUserId(req.body.userId);
            const ownUserData = await this.userService.getUserData(req.body.userId);
            await Promise.all(
                ownUserPosts.map(async (ownPost) => {
                    data.push({
                        user: ownUserData,
                        post: ownPost
                    })
                })
            )
            await Promise.all(userFriendsIds.map(async (userId) => {
                const user = await this.userService.getUserData(userId)
                const postsByUserId = await this.getPostsByUserId(userId);
                postsByUserId.map(post => {
                    data.push({
                        user,
                        post
                    })
                })
            }))
            res.send({
                data
            })
        } catch (error) {
            res.send({
                data,
                message: 'An error ocurred'
            })
        }

    }

    public addPost = (req: Request, res: Response) => {
        const post: Post = req.body.post;
        const user: admin.auth.UserInfo = req.body.user;
        this.postCollection
            .doc(user.uid)
            .collection('/userPosts')
            .add({
                title: post.title,
                description: post.description,
                userId: user.uid,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            })
            .then(response => {
                res.send({
                    message: 'Document added successfully'
                })
            })
            .catch(error => {
                res.send({
                    message: 'Documento not added'
                })
            })
    }

    private getPostsByUserId(userId: string) {
        return this.postCollection
            .doc(userId)
            .collection('/userPosts')
            .limit(15)
            .get()
            .then(querySnapshot => {
                let data: FirebaseFirestore.DocumentData[] = []
                querySnapshot.forEach(doc => {
                    data.push(doc.data())
                });
                return data;
            })
    }

}