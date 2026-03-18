
import { useMutation } from '@tanstack/react-query';
import { LoginRequest } from '../api/authApi';
import type { LoginDto } from '../api/authApi'

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: LoginDto) => LoginRequest(data),
        onError: (error) => {
            console.error('Login error:', error);
        }
    });
};