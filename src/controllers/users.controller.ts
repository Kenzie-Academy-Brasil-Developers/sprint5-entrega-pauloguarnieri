import {Request, Response} from 'express';
import UserServices from '../services/user.services';

export default class UserController {
static store = async(request: Request, response: Response) => {
    const {name, email, password, age} = request.newUser;
    try {
        const newUser = await UserServices.store({name, email, password, age});
        return response.status(201).json({
            message: "user created",
            newUser
        })
    } catch(err){
        if(err instanceof Error){
            return response.status(400).json({
                error: err.name,
                message: err.message
            });
        }
    };
}
 
static list = async(request: Request, response: Response) => {
    try {
        const users = await UserServices.list();
        return response.json(users);
    } catch(err) {
        if(err instanceof Error){
            return response.status(400).json({
                error: err.name,
                message: err.message
            });
        }
    };
}
 
static index = async(request: Request, response: Response) => {
    const {id} = request.params;
    try {
        const user = await UserServices.index({id});
        return response.json(user);
    } catch(err) {
        if(err instanceof Error){
            return response.status(400).json({
                error: err.name,
                message: err.message
            })
        }
    };
}
 
static update = async(request: Request, response: Response) => {
    const {id} = request.params;
    const objectBody = request.body;
    try {
        const updatedUser = await UserServices.update(id,objectBody);
        return response.json(updatedUser);
    } catch(err) {
        if(err instanceof Error){
            return response.status(400).json({
                error: err.name,
                message: err.message
            })
        }
    };
}
 
static delete = async(request: Request, response: Response) => {
    const {id} = request.params;

    try {
        const deletedUser = await UserServices.delete({id});
        return response.status(200).json({
            message: "user deleted",
            deletedUser
        })
    } catch(err) {
        if(err instanceof Error) {
            return response.status(400).json({
                error: err.name,
                message: err.message
            })
        }
    };

}
 
};