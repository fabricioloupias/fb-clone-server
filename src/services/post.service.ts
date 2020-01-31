import admin from 'firebase-admin';
import { Request, Response } from 'express';
import { Post } from '../models/post.model';
import { UserService } from './user.service';

export class PostService {
    private db = admin.firestore();
    private postCollection = this.db.collection('/posts');
    private userService: UserService = new UserService();

    public getPosts = (req: Request, res: Response) => {
        this.userService.getUserFriends(req.body.userId)
            .then(userFriends => {
                let posts: FirebaseFirestore.DocumentData[] = []
                userFriends.map(userId => {
                    this.getPostById(userId)
                        .then(querySnapshot => {
                            if (!querySnapshot.empty) {
                                querySnapshot.docs.map(documentSnapshot => {
                                    posts.push(documentSnapshot.data())
                                });
                            }
                            res.send({
                                posts
                            })
                        })
                })

            })
    }

    private getPostById(userId: string) {
        return this.postCollection
            .doc(userId)
            .collection('/userPosts')
            .get()
    }

}