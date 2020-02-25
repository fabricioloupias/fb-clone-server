"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_constants_1 = require("../constants/api.constants");
const user_service_1 = require("../services/user.service");
class UserController {
    constructor(app) {
        this.app = app;
        this.userService = new user_service_1.UserService();
        this.routes();
    }
    routes() {
        this.app.route(`${UserController.USERS_PATH}`).post(this.userService.saveUserInDB);
        this.app.route(`${UserController.USERS_PATH}/getFriends`).post(this.userService.getUserFriends);
        this.app.route(`${UserController.USERS_PATH}/searchUser`).post(this.userService.searchUser);
        this.app.route(`${UserController.USERS_PATH}/follow-user`).post(this.userService.followUser);
        this.app.route(`${UserController.USERS_PATH}/:userId`).get(this.userService.fetchUser);
    }
}
exports.UserController = UserController;
UserController.USERS_PATH = `${api_constants_1.API_PATH_BASE}/users`;
UserController.ALGOLIA_INDEX = 'dev_clone_fb';
