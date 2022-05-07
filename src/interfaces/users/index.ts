export interface IUserCreate {
    name: string;
    email: string;
    password: string;
    age: number;
}

export interface IUser extends IUserCreate {
    id: string;
    created_at: Date;
    updated_at: Date;
}

export interface IIdObject {
    id: string
}

export interface IMisteryObject {
    name?: string;
    email?: string;
    password?: string;
    age?: number;
}