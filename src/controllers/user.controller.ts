import { Application } from 'express';
import { API_PATH_BASE } from '../constants/api.constants';
import { UserService } from '../services/user.service';

export class UserController{
    private userService: UserService;
    static USERS_PATH = `${API_PATH_BASE}/users`

    constructor(private app: Application){
        this.userService = new UserService();
        this.routes();
    }

    public routes(){
        this.app.route(`${UserController.USERS_PATH}`).post(this.userService.saveUserInDB);
        this.app.route(`${UserController.USERS_PATH}/getFriends`).post(this.userService.getUserFriends)
    }
}