import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../model/useLogin"
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../model/login.schema";
import { Input } from "../../../shared/ui/Input/Input";
import Logo from '../../../assets/svg/Logo.svg'
import Lock from '../../../assets/svg/Lock.svg'
import User from '../../../assets/svg/User.svg'
import Close from '../../../assets/svg/Close.svg'

export const LoginForm = () => {
    const navigate = useNavigate();
    const { mutate, isPending, error } = useLogin()

    // Состояние для показа/скрытия пароля
    const [showPassword, setShowPassword] = useState(false);

    // Состояние для очистки поля
    const [username, setUsername] = useState('');

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
            rememberMe: false
        }
    });

    // Следим за значением username
    const usernameValue = watch('username');

    const onSubmit = (data: LoginFormData) => {
        console.log("FORM DATA:", data)
        mutate(
            {
                username: data.username,
                password: data.password,
                expiresInMins: 30
            },
            // {
            //     username: 'emilys',
            //     password: 'emilyspass',
            //     expiresInMins: 30
            // },
            {
                onSuccess: (response) => {
                    const token = response.token;
                    if (data.rememberMe) {
                        localStorage.setItem("token", token);
                    } else {
                        sessionStorage.setItem("token", token)
                    }
                    navigate("/products");
                }
            }
        )
    };

    // Обработчик для очистки поля логина
    const handleClearUsername = () => {
        setValue('username', '', { shouldValidate: true });
    };

    // Обработчик для показа/скрытия пароля
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <div className="bg-white p-[6px] rounded-[40px]">
                <div className="relative p-[1px] rounded-[40px] bg-gradient-to-b from-[#EDEDED] to-transparent">
                    <div className="bg-white p-8 rounded-[40px] flex gap-[32px] flex-col w-full max-w-md bg-gradient-to-b from-[#23232308] to-[#23232300]">

                        {/* Логотип и заголовки */}
                        <div>
                            <img src={Logo} alt="Logo" className="w-[52px] h-[52px] mx-auto" />
                            <h1>
                                Добро пожаловать!
                            </h1>
                            <h2 className="text-gray-600 text-center gradient-gray mt-2">
                                Пожалуйста, авторизируйтесь
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-[16px]">

                            {/* Поле Логин с иконкой Delete */}
                            <Input
                                label="Логин"
                                type="text"
                                register={register('username')}
                                error={errors.username?.message}
                                placeholder="Введите логин"
                                leftIcon={User}
                                rightIcon={usernameValue ? Close : undefined} // Показываем Delete только если есть текст
                                onRightIconClick={usernameValue ? handleClearUsername : undefined}
                            />

                            {/* Поле Пароль с иконкой Eye для показа/скрытия */}
                            <Input
                                label="Пароль"
                                type="password"
                                register={register('password')}
                                error={errors.password?.message}
                                leftIcon={Lock}
                                showPasswordToggle
                            />

                            {/* Чекбокс и кнопка */}
                            <div className="flex flex-col gap-[16px] mt-[16px]">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        {...register('rememberMe')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-200 rounded"
                                    />
                                    <label className="ml-2 block text-sm text-[#9C9C9C]">
                                        Запомнить данные
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors font-medium 
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed LoginButton"
                                >
                                    {isPending ? "Вход..." : "Войти"}
                                </button>
                            </div>

                            {/* Разделитель */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border"></div>
                                </div>
                                <div className="relative flex justify-center text-sm ">
                                    <div className="bg-white">
                                        <span className="px-2 gradient-gray">или</span>
                                    </div>
                                </div>
                            </div>

                            {/* Ссылка на регистрацию */}
                            <p className="text-center text-[18px] text-[#6c6c6c]">
                                Нет аккаунта?{' '}
                                <a href="#" className="text-[#242EDB] hover:text-[#242EDB] underline font-medium">
                                    Создать
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};