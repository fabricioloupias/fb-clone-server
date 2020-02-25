"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const user_service_1 = require("./user.service");
class PostService {
    constructor() {
        this.db = firebase_admin_1.default.firestore();
        this.postCollection = this.db.collection('/posts');
        this.userService = new user_service_1.UserService();
        this.getPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let data = [];
            try {
                const userFriendsIds = yield this.userService.getUserFriends(req.body.userId);
                const ownUserPosts = yield this.getPostsByUserId(req.body.userId);
                const ownUserData = yield this.userService.getUserData(req.body.userId);
                yield Promise.all(ownUserPosts.map((ownPost) => __awaiter(this, void 0, void 0, function* () {
                    data.push({
                        user: ownUserData,
                        post: ownPost
                    });
                })));
                yield Promise.all(userFriendsIds.map((userId) => __awaiter(this, void 0, void 0, function* () {
                    const user = yield this.userService.getUserData(userId);
                    const postsByUserId = yield this.getPostsByUserId(userId);
                    postsByUserId.map(post => {
                        data.push({
                            user,
                            post
                        });
                    });
                })));
                res.send({
                    data
                });
            }
            catch (error) {
                res.send({
                    data,
                    message: 'An error ocurred'
                });
            }
        });
        this.addPost = (req, res) => {
            const post = req.body.post;
            const user = req.body.user;
            this.postCollection
                .doc(user.uid)
                .collection('/userPosts')
                .add({
                title: post.title,
                description: post.description,
                userId: user.uid,
                createdAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp()
            })
                .then(response => {
                res.send({
                    message: 'Document added successfully'
                });
            })
                .catch(error => {
                res.send({
                    message: 'Documento not added'
                });
            });
        };
    }
    getPostsByUserId(userId) {
        return this.postCollection
            .doc(userId)
            .collection('/userPosts')
            .limit(15)
            .get()
            .then(querySnapshot => {
            let data = [];
            querySnapshot.forEach(doc => {
                data.push(doc.data());
            });
            return data;
        });
    }
}
exports.PostService = PostService;
