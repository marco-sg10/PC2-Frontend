import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Input} from "../components/Input";
import {Button} from "../components/Button";
import type {FormEvent, ChangeEvent} from "react";
import axios from "axios";
import {register} from "../services/authService";
import type {RegisterRequest} from "../types/auth";

export default function Register(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterRequest>({
        name: '',
        email: '',
        password: ''
    });

    // actuliacion
    // cambios a subir 
    const [error, setError] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const validate = ():boolean => {
        const newError: Record<string, string> = {};
        if(!formData.name.trim())
            newError.name = 'El nombre es requerido';
        if(!formData.email.trim())
            newError.email = 'El correo es requerido';
        if(!formData.password.trim())
            newError.password = 'La contraseña es requerida';
        setError(newError);
        return Object.keys(newError).length === 0;
    }

    // cambios 

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        setError(prev => ({...prev, [name]: '', form: ''})); 
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(!validate()) return;
        setLoading(true);
        try{
            await register(formData);
            navigate('/login',{replace:true});
        }catch (error){
            if (axios.isAxiosError(error) && error.response?.status === 400){
                setError({form: 'El correo ya está registrado'});
            } else {
                setError({form: 'Ocurrió un error, por favor intente nuevamente'});
            }
        }finally{
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>
                {error.form && <div className="text-red-500 mb-4">{error.form}</div>}
                <form onSubmit={handleSubmit}>
                    <Input 
                        label = "Nombre"
                        name = "name"
                        value = {formData.name}
                        onChange = {handleChange}
                        error = {error.name}
                    />
                    <Input
                        label = "Correo"
                        name = "email"
                        type = "email"
                        value = {formData.email}
                        onChange = {handleChange}
                        error = {error.email}
                    />
                    <Input
                        label = "Contraseña"
                        name = "password"
                        type = "password"
                        value = {formData.password}
                        onChange = {handleChange}
                        error = {error.password}
                    />
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </Button>
                </form>
                <p className="mt-4 text-center">
                    ¿Ya tienes una cuenta? <Link to="/login" className="text-blue-600 hover:underline">Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
}