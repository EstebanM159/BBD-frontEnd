import { z } from 'zod'

const UserSchema = z.object({
  _id: z.string(),
  userName: z.string(),
  email: z.string().email(),
  phone: z.number(),
  password: z.string(),
  role: z.string(),
  picture: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
  tokenId: z.string()
})
export const UserActiveSchema = z.object({
  _id: z.string(),
  userName: z.string(),
  google_id: z.string().nullable(),
  phone: z.number().nullable(),
  facebook_id: z.string().nullable(),
  email: z.string().email(),
  picture: z.string(),
  role: z.string()
})

export type User = z.infer<typeof UserSchema>
export type UserActive = z.infer<typeof UserSchema>
export type UserLogin = Pick<User, 'email'|'password'>
export type ForgotPasswordToken = Pick<User, 'token'|'tokenId'>
export type ForgotPasswordForm = Pick<User, 'email'>
export type NewPasswordT = Pick<User, 'password'|'password_confirmation'>
export type UpdateProfile = Pick<UserActive, '_id'|'email'|'userName'|'phone'> // agregar telefono mas adelante
const UserProfileFacebookSchema = z.object({
  email: z.string(),
  name: z.string(),
  id: z.number(),
  picture: z.string()
})
const LoginSuccessSchema = z.object({
  accessToken: z.string(),
  data_access_expiration_time: z.number(),
  userID: z.string()
})
export type UserRegisterForm = Pick<User, 'email'| 'password'|'phone'|'userName'>
export type UserProfileFacebook = z.infer<typeof UserProfileFacebookSchema>
export type LoginSuccess = z.infer<typeof LoginSuccessSchema>
export const ChangePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
  newPassword_confirmation: z.string()
})
export type ChangePasswordForm = z.infer<typeof ChangePasswordSchema>
