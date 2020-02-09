import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import admin from 'firebase-admin';
import { AuthController } from './controllers/auth.controller';
import dotenv from 'dotenv';
import { PostController } from './controllers/post.controller';
import { UserController } from './controllers/user.controller';
import algoliasearch, { SearchClient, SearchIndex }  from 'algoliasearch';

class App {
    public app: Application;
    public authController: AuthController;
    public postController: PostController;
    public userController: UserController;
    private algoliaClient: SearchClient;
    private algoliaIndex: SearchIndex;

    constructor() {
        dotenv.config();
        this.app = express();
        this._setfirebaseConfig();
        this.setConfig();
        this.authController = new AuthController(this.app);
        this.postController = new PostController(this.app);
        this.userController = new UserController(this.app);
    }

    private setConfig() {
        //Allows us to receive requests with data in json format
        this.app.use(bodyParser.json({ limit: '50mb' }));

        //Allows us to receive requests with data in x-www-form-urlencoded format
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

        //Enables cors   
        this.app.use(cors());
    }

    private async _setfirebaseConfig() {
        const serviceAccount: admin.ServiceAccount = {
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://fb-clone-server-373e0.firebaseio.com"
        });
    }

    public getAlgoliaSearch() {
        return algoliasearch(`${process.env.ALGOLIA_APP_ID}`, `${process.env.ALGOLIA_APP_KEY}`);
    }
}

export default new App().app;