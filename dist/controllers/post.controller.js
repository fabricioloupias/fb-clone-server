"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_constants_1 = require("../constants/api.constants");
const post_service_1 = require("../services/post.service");
class PostController {
    constructor(app) {
        this.app = app;
        this.postService = new post_service_1.PostService();
        this.routes();
    }
    routes() {
        this.app.route(`${PostController.POSTS_PATH}/getPostsFriends`).post(this.postService.getPosts);
        this.app.route(`${PostController.POSTS_PATH}`).post(this.postService.addPost);
    }
}
exports.PostController = PostController;
PostController.POSTS_PATH = `${api_constants_1.API_PATH_BASE}/posts`;
