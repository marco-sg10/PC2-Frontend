import api from '../api/axios';
import type {Resource,ResourceDetails,OperationRequest } from '../types/resource';
import type {PageResponse, ApiError} from '../types/common';

export const getAll = async (page:number) => {
    const res = await api.get<PageResponse<Resource>>('/api/activities',{params:{page,size:5}});
    return res.data;
};

export const getById = async (id:number) => {
    const res = await api.get<ResourceDetails>(`/api/activities/${id}`);
    return res.data;
};

export const createOperation = async (id:number, data:OperationRequest) => {
    const res = await api.post(`/api/activities/${id}/operations`, data);
    return res.data;
};
