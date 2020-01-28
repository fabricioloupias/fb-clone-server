"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
class UserService {
    constructor() {
        this.db = firebase_admin_1.default.firestore();
        this.userCollection = this.db.collection('/users');
        this.saveUserInDB = (user) => {
            return this.userCollection.doc(user.uid)
                .set({
                displayName: user.displayName,
                email: user.email
            });
        };
    }
}
exports.UserService = UserService;
