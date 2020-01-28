"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const user_service_1 = require("./user.service");
class AuthService {
    constructor() {
        this.userService = new user_service_1.UserService();
        this.createUser = (req, res) => {
            const { email, phoneNumber, password, firstName, lastName, photoURL } = req.body;
            firebase_admin_1.default.auth().createUser({
                email,
                phoneNumber,
                password,
                displayName: `${firstName} ${lastName}`,
                photoURL
            })
                .then(user => {
                this.userService.saveUserInDB(user)
                    .then(response => {
                    res.send(response);
                })
                    .catch(error => {
                    res.send(error);
                });
            })
                .catch((error) => {
                res.send(error);
            });
        };
    }
}
exports.AuthService = AuthService;
