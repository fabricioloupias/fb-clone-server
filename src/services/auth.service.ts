import admin from 'firebase-admin';
import { Request, Response } from 'express';
import { UserService } from './user.service';

export class AuthService {
    private userService: UserService = new UserService();

    public createUser = (req: Request, res: Response) => {
        const {
            email,
            phoneNumber,
            password,
            firstName,
            lastName,
            photoURL
        } = req.body;

        admin.auth().createUser({
            email,
            phoneNumber,
            password,
            displayName: `${firstName} ${lastName}`,
            photoURL
        })
            .then(user => {
                this.userService.checkIfUserExists(user.uid)
                    .then(isExist => {
                        if (!isExist) {
                            this.userService.saveUserInDB(user)
                                .then(response => {
                                    res.send({
                                        message: 'User saved succesfully',
                                    })
                                })
                                .catch(error => {
                                    res.send({
                                        message: error
                                    })
                                })
                        }
                        res.send({
                            message: 'User has exist'
                        })
                    })

            })
            .catch((error) => {
                res.send({
                    message: error
                })
            })

    }

}