import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Input} from "../components/Input";
import {Button} from "../components/Button";
import type {FormEvent, ChangeEvent} from "react";
import axios from "axios";
import {register} from "../services/authService";
import type {RegisterRequest} from "../types/auth";
import type {Resource} from "../types/resource";

export default function ResourceDetail(){
    const navigate = useNavigate();
    const [resource, setResource] = useState<Resource | null>(null);
    const [loading, setLoading] = useState(true);
    // interfaz para el recurso
    const fetchResource = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login', { replace: true });
                return;
            }
            const response = await axios.get<Resource>(`${import.meta.env.VITE_API_URL}/resources/1`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setResource(response.data);
        } catch (error) {
            console.error('Error fetching resource:', error);
        } finally {
            setLoading(false);
        }
    };

    
    useState(() => {
        fetchResource();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Detalle del Recurso</h2>
                {loading ? (
                    <div>Cargando...</div>
                ) : resource ? (
                    <div>
                        <p><strong>Nombre:</strong> {resource.name}</p>
                        <p><strong>Descripción:</strong> {resource.description}</p>
                        <p><strong>Tipo:</strong> {resource.type}</p>
                        <p><strong>Disponibilidad:</strong> {resource.available ? 'Disponible' : 'No disponible'}</p>
                    </div>
                ) : (
                    <div>No se encontró el recurso.</div>
                )}
            </div>
        </div>
    );  
}