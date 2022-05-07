import {Request, Response, NextFunction, response} from 'express';
import { IUserCreate } from '../interfaces/users';
import * as yup from 'yup';
import { SchemaOf } from 'yup';

export const userCreateSchema: SchemaOf<IUserCreate> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    age: yup.number().required()
})

export const validateUserCreate = (schema: SchemaOf<IUserCreate>) => async (request: Request, response: Response, next: NextFunction) => {

    try {
        const data = request.body;
        try{
            const validatedData = await schema.validate(data, {abortEarly: false, stripUnknown: true})
            request.newUser = validatedData

            next();
        } catch( err: any) {
            return response.status(400).json({error: err.errors?.join(', ')})
        }

    } catch(err) {
        next(err)
    }

}