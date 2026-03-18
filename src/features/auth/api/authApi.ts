import { apiClient } from '../../../shared/api/apiClient'

export interface LoginDto {
    username: string;
    password: string;
    expiresInMins?: 30
}

export const LoginRequest = async (data: LoginDto) => {
    
    try {
        const response = await apiClient.post("/auth/login", data);
        console.log("Login response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Login request failed:", error);
        throw error;
    }
};