import api from '../api/axios';
import type {LoginRequest,LoginResponse, RegisterRequest,RegisterResponse} from '../types/auth';

export const login = async (data: LoginRequest)=>{
    const res = await api.post<LoginResponse>('/api/auth/login', data);
    return res.data;
};

export const register = async (data: RegisterRequest)=>{
    const res = await api.post<RegisterResponse>('/api/auth/register', data);
    return res.data;
};
