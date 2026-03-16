import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../model/useLogin"
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../model/login.schema";

export const LoginForm = () => {
    const navigate = useNavigate();
    const { mutate, isPending, error } = useLogin()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
            rememberMe: false
        }
    })


    const onSubmit = (data: LoginFormData) => {
        mutate(
            {
                username: data.username,
                password: data.password
            },
            {
                onSuccess: (response) => {
                    const token = response.token;
                    if (data.rememberMe) {
                        localStorage.setItem("token", token);
                    } else {
                        sessionStorage.setItem("token", token)
                    }

                    navigate("/prodacts");
                }
            }
        )
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Username</label>
                <input {...register("username")} />
                {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div>
                <label>Password</label>
                <input type="password" {...register("password")} />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div>
                <label >
                    <input type="checkbox" {...register("rememberMe")} />
                    Remember me
                </label>
            </div>

            {error && <p> Login failed</p>}


            <button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Login"}
            </button>
        </form>
    )
};