import { Application } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController{
    private authService: AuthService;
    static AUTH_PATH = '/auth'

    constructor(private app: Application){
        this.authService = new AuthService();
        this.routes();
    }

    public routes(){
        this.app.route(`${AuthController.AUTH_PATH}/signUp`).post(this.authService.createUser);
    }
}