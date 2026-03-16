import { useMutation } from "@tanstack/react-query"
import { LoginRequest } from "../api/authApi"

export const useLogin = () => {
    return useMutation({
        mutationFn: LoginRequest
    });
};