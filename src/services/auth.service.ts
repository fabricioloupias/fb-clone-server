import admin from 'firebase-admin';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { SearchClient, SearchIndex } from 'algoliasearch';

export class AuthService {
    private userService: UserService = new UserService();

    constructor() {
    }

    public createUser = async (req: Request, res: Response) => {
        const {
            email,
            phoneNumber,
            password,
            firstName,
            lastName,
            photoURL
        } = req.body;

        try {
            const userRecord = await admin.auth().createUser({
                email,
                phoneNumber,
                password,
                displayName: `${firstName} ${lastName}`,
                photoURL
            });

            const userSaved = await this.userService.saveUserInDB(userRecord);

            res.send({
                message: 'User saved succesfully',
                data: userSaved
            })

        } catch (error) {
            console.log(error);
            res.send({
                message: 'Error while trying saved data'
            })
        }
    }

}