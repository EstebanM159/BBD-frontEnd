import {z} from 'zod'

const UserSchema = z.object({
    userName: z.string(),
    email: z.string().email(),
    phone: z.number(),
    password: z.string(),
    password_confirmation: z.string() 
})
export type User = z.infer<typeof UserSchema>
export type UserLogin = Pick<User, 'email'|'password'>
const UserProfileFacebookSchema = z.object({
    email:z.string(),
    name:z.string(),
    id:z.number(),
    picture:z.object({
        data:z.object({
            height:z.number(),
            url:z.string(),
            width:z.number()
        })
    })
})
const LoginSuccessSchema = z.object({
    accessToken: z.string(),
    data_access_expiration_time: z.number(),
    userID: z.string()
})
export type UserRegisterForm = Pick<User,'email'| 'password'|'phone'|'userName'>
export type UserProfileFacebook = z.infer<typeof UserProfileFacebookSchema>
export type LoginSuccess = z.infer<typeof LoginSuccessSchema>
const dateSchema = z.object({
    service:z.string(),
    date:z.string(),
    time:z.string()
})
export type Date = z.infer<typeof dateSchema>