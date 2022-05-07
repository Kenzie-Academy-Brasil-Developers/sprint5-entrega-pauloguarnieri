import { Router } from "express";
import UserController from "../controllers/users.controller";
import { validateUserCreate } from "../middlewares/validateUserCreation.middleware";
import { userCreateSchema } from "../middlewares/validateUserCreation.middleware";

const userRoutes = Router();

userRoutes.post('', validateUserCreate(userCreateSchema), UserController.store); //create
userRoutes.get('', UserController.list); //list
userRoutes.get('/:id', UserController.index); //index
userRoutes.patch('/:id', UserController.update); //update
userRoutes.delete('/:id', UserController.delete) //delete

export default userRoutes;