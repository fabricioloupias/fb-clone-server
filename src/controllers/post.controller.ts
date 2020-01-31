import { Application } from 'express';
import { API_PATH_BASE } from '../constants/api.constants';
import { PostService } from '../services/post.service';

export class PostController{
    private postService: PostService;
    static POSTS_PATH = `${API_PATH_BASE}/posts`

    constructor(private app: Application){
        this.postService = new PostService();
        this.routes();
    }

    public routes(){
        this.app.route(`${PostController.POSTS_PATH}/getPostsFriends`).post(this.postService.getPosts);
    }
}