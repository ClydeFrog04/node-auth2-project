import {usersDb} from "../data/dbConfig";

interface IUser{
    username: string;
    password: string;
    department: string;
}


export async function findById(id:number){
    return usersDb("users")
        .select("id", "username")
        .where({id})
        .first();
}

export async function add(user:IUser) {
    const [id] = await usersDb("users").insert(user);
    return findById(id);
}

export function find() {
    return usersDb("users").select("id", "username");

}

export function findBy(filter:any) {
    return usersDb("users")
        .select("id", "username", "password")
        .where(filter);

}