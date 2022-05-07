import { User } from "../entities/user.entity";
import { IUser, IUserCreate, IIdObject, IMisteryObject } from "../interfaces/users";
import { AppDataSource } from "../data-source";
import bcrypt from "bcrypt";


export default class UserServices {
    static store = async({name, email, password, age}:IUserCreate) =>  {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();

        const user:IUser = new User();
        user.name = name;
        user.email =  email;
        user.password = bcrypt.hashSync(password, 8);
        user.age = age;
        user.created_at = new Date();
        user.updated_at = new Date();

        userRepository.create(user)
        await userRepository.save(user);

        console.log('create service', user);
        return user;

    }

    static list = async () => {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();

        return users;
    }

    static index = async ({id}:IIdObject) => {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();

        const user = users.find(item => item.id === id);
        
        if(!user) {
            throw new Error("This user doesn't exist");
        }
        return user;
    }

    static update = async (id: string, object: IMisteryObject) => {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();

        const user = users.find(item => item.id === id);

        if(!user) {
            throw new Error ('User not found');
        }

        if(object.password){
            const newPassword = bcrypt.hashSync(object.password, 8);
            object.password = newPassword;
        }
        
        const newUser = {
            ...user, 
            ...object,
            ...{updated_at: new Date()}
        }
        const {name, email, password, age, created_at, updated_at} = newUser;

        await userRepository.update(user!.id, {
            name, 
            email, 
            password, 
            age, 
            created_at, 
            updated_at
        });

        return newUser;
        
    }

    static delete = async ({id}: IIdObject) =>{
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();

        const user = users.find(item => item.id === id);

        if(!user){
            throw new Error('User not found');
        }

        await userRepository.delete(user!.id);

        return user;
    }
}