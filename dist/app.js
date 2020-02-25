"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const auth_controller_1 = require("./controllers/auth.controller");
const dotenv_1 = __importDefault(require("dotenv"));
const post_controller_1 = require("./controllers/post.controller");
const user_controller_1 = require("./controllers/user.controller");
const algoliasearch_1 = __importDefault(require("algoliasearch"));
class App {
    constructor() {
        dotenv_1.default.config();
        this.app = express_1.default();
        this._setfirebaseConfig();
        this.setConfig();
        this.authController = new auth_controller_1.AuthController(this.app);
        this.postController = new post_controller_1.PostController(this.app);
        this.userController = new user_controller_1.UserController(this.app);
    }
    setConfig() {
        //Allows us to receive requests with data in json format
        this.app.use(body_parser_1.default.json({ limit: '50mb' }));
        //Allows us to receive requests with data in x-www-form-urlencoded format
        this.app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
        //Enables cors   
        this.app.use(cors_1.default());
    }
    _setfirebaseConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceAccount = {
                projectId: process.env.FIREBASE_PROJECT_ID,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            };
            firebase_admin_1.default.initializeApp({
                credential: firebase_admin_1.default.credential.cert(serviceAccount),
                databaseURL: "https://fb-clone-server-373e0.firebaseio.com"
            });
        });
    }
    getAlgoliaSearch() {
        return algoliasearch_1.default(`${process.env.ALGOLIA_APP_ID}`, `${process.env.ALGOLIA_APP_KEY}`);
    }
}
exports.default = new App().app;
