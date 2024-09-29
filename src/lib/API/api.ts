import { GlobalApiCall } from "./GlobalApiCall";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export async function loginApi(data: {email: string, password: string}) {
    const response = await GlobalApiCall({
        url: `${API_BASE_URL}/api/auth/login`, 
        options: {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    })

    return response.json();
}

export const registerApi = async (data: {email: string, name: string, password: string, passwordConfirm: string}) => {
    const response = await GlobalApiCall({
        url: `${API_BASE_URL}/api/auth/register`, 
        options: {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    });

    return response.json();
}

export const forgotPasswordApi = async ({ email }:{ email: string }) => {
    const response = await GlobalApiCall({
        url: `${API_BASE_URL}/api/auth/forgot-password`,
        options:{
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        }
    })

    return response.json();
}

export const resetPasswordApi = async ({ token, new_password, new_password_confirm }:{ token: string, new_password: string, new_password_confirm: string, }) => {
    const response = await GlobalApiCall({
        url: `${API_BASE_URL}/api/auth/reset-password`,
        options:{
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, new_password, new_password_confirm })
        }
    })

    return response.json();
}

export const dataMeApi = async (data: { cookies: string }) => {
    const response = await GlobalApiCall({
        url: `${API_BASE_URL}/api/users/me`, 
        options: {
            method: 'Get',
            headers: {
                'cookie': `token=${data.cookies}`
            },
        }
    });

    return response.json();
}

export const AdminUsersAPI = async (data: { cookies: string, page: number, limit: number }) => {
    const response = await GlobalApiCall({
        url: `${API_BASE_URL}/api/users/users?page=${data.page}&limit=${data.limit}`, 
        options :{
        method: 'Get',
        headers: {
            'cookie': `token=${data.cookies}`
        },
        credentials: 'include',
    }
    });

    return response.json();
}

export const UpdatedUserNameAPI = async ({ cookie, name }: { cookie: string, name: string }) => {
    const response = await GlobalApiCall({
        url: `${API_BASE_URL}/api/users/name`,
        options: {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'cookie': `token=${cookie}`
            },
            body: JSON.stringify({ name })
        }
    })

    return response.json();
}

export const UpdatedUserRoleAPI = async ({ cookie, role }: { cookie: string, role: string }) => {
    const response = await GlobalApiCall({
        url: `${API_BASE_URL}/api/users/role`,
        options: {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'cookie': `token=${cookie}`
            },
            body: JSON.stringify({ role })
        }
    })

    return response.json();
}

export const UpdatedUserPasswordAPI = async ({ cookie, new_password, new_password_confirm, old_password }: { cookie: string, new_password: string, new_password_confirm: string, old_password: string }) => {
    const response = await GlobalApiCall({
        url: `${API_BASE_URL}/api/users/password`,
        options: {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'cookie': `token=${cookie}`
            },
            body: JSON.stringify({ new_password, new_password_confirm, old_password })
        }
    })

    return response.json();
}