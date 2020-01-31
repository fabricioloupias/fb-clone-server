import { Application } from 'express';
import { AuthService } from '../services/auth.service';
import { API_PATH_BASE } from '../constants/api.constants';

export class AuthController{
    private authService: AuthService;
    static AUTH_PATH = `${API_PATH_BASE}/auth`

    constructor(private app: Application){
        this.authService = new AuthService();
        this.routes();
    }

    public routes(){
        this.app.route(`${AuthController.AUTH_PATH}/signUp`).post(this.authService.createUser);
    }
}