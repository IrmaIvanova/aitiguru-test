import axios from "axios";

export const apiClient = axios.create({
    //  baseURL: import.meta.env.VITE_API_URL,
    baseURL: "https://dummyjson.com",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// apiClient.interceptors.request.use(request => {
//     console.log('📤 Request:', {
//         url: request.url,
//         method: request.method,
//         data: request.data,
//         headers: request.headers
//     });
//     return request;
// });

// apiClient.interceptors.response.use(
//     response => {
//         console.log('📥 Response:', {
//             status: response.status,
//             data: response.data
//         });
//         return response;
//     },
//     error => {
//         console.log('📥 Error Response:', {
//             status: error.response?.status,
//             data: error.response?.data,
//             message: error.message
//         });
//         return Promise.reject(error);
//     }
// );