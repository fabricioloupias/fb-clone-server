import { Application } from 'express';
import { API_PATH_BASE } from '../constants/api.constants';
import { UserService } from '../services/user.service';
import { SearchIndex, SearchClient } from 'algoliasearch';

export class UserController{
    private userService: UserService = new UserService();
    static USERS_PATH = `${API_PATH_BASE}/users`
    static readonly ALGOLIA_INDEX: string = 'dev_clone_fb';


    constructor(private app: Application){
        this.routes();
    }

    public routes(){
        this.app.route(`${UserController.USERS_PATH}`).post(this.userService.saveUserInDB);
        this.app.route(`${UserController.USERS_PATH}/getFriends`).post(this.userService.getUserFriends)
        this.app.route(`${UserController.USERS_PATH}/searchUser`).post(this.userService.searchUser)
    }
}