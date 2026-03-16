import { apiClient } from '../../../shared/api/apiClient'

export interface LoginDto {
    username: string;
    password: string;
}

export const LoginRequest = async ( data: LoginDto) =>{
    const response = await apiClient.post("/auth/login", data)

    return response.data
}