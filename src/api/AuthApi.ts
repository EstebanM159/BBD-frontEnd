import { ProfileSuccessResponse } from "@greatsumini/react-facebook-login";
import { User } from "../schemas";
import api from "../lib/axios";

export async function createUser(response:ProfileSuccessResponse){
    const {data} = await api.post<string>('/auth/create-account-withF',response)
    return data
}

export async function createAccount(formData:User) {
    const {data } = await api.post<string>('/auth/create-account',formData)
    return data
}