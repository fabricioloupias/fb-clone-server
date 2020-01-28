"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../services/auth.service");
class AuthController {
    constructor(app) {
        this.app = app;
        this.authService = new auth_service_1.AuthService();
        this.routes();
    }
    routes() {
        this.app.route(`${AuthController.AUTH_PATH}/signUp`).post(this.authService.createUser);
    }
}
exports.AuthController = AuthController;
AuthController.AUTH_PATH = '/auth';
