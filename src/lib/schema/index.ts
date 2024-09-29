import { z } from "zod";

export interface UserDataInterFace {
    id: string;
    name: string;
    email: string;
    role: string;
    verified: boolean;
}

export enum UserRole {
    Admin = 'Admin',
    User = 'User',
}

export const loginSchema = z.object({
    email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

    password: z.string()
    .min(6, { message: "Password should be at least 6 characters long" }),
})


export const registerSchema = z.object({
    email: z.string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
        
        name: z.string()
        .min(1, { message: "Name is required" }),
        
        password: z.string()
        .min(6, { message: "Password should be at least 6 characters long" }),
        
        passwordConfirm: z.string()
        .min(1, { message: "Password confirmation is required" }),
    }).refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match",
    path: ["passwordConfirm"]
});

export const forgotPasswordSchema = z.object({
    email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
})

export const resetPasswordSchema = z.object({
    token: z.string()
    .min(1, { message: "token is required" }),
    new_password: z.string()
    .min(6, { message: "Password should be at least 6 characters long" }),
    
    new_password_confirm: z.string()
    .min(1, { message: "Password confirmation is required" }),
}).refine((data) => data.new_password === data.new_password_confirm, {
    message: "Passwords do not match",
    path: ["new_password_confirm"]
})


export const userDataSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required" 
    }),
    email: z.string().min(1, {
        message: "Email is required",
    }).email({ message: "Invalid email address" }),
});


export const passwordChangeSchema = z.object({
    oldpassword: z.string()
    .min(6, { message: "Password should be at least 6 characters long" }),
    newpassword: z.string()
    .min(6, { message: "Password should be at least 6 characters long" }),
    
    newpasswordConfirm: z.string()
    .min(1, { message: "Password confirmation is required" }),
}).refine((data) => data.newpassword === data.newpasswordConfirm, {
    message: "Passwords do not match",
    path: ["newpasswordConfirm"]
});


export const userRoleUpdate = z.object({
    role: z.enum([UserRole.Admin, UserRole.User]),
});

export type LoginSchema = typeof loginSchema;
export type RegisterSchema = typeof registerSchema;
export type ForgotPasswordSchema = typeof forgotPasswordSchema;

export type UserDataSchema = typeof userDataSchema;
export type PasswordChangeSchema = typeof passwordChangeSchema;
export type UserRoleUpdate = typeof userRoleUpdate;