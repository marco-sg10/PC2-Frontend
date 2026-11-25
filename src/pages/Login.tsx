import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Input} from "../components/Input";
import {Button} from "../components/Button";
import type {FormEvent, ChangeEvent} from "react";
import axios from "axios";
import {login} from "../services/authService";
import type {LoginRequest} from "../types/auth";

export default function Login(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginRequest>({
        email: '',
        password: ''
    });

    const [error, setError] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const validate = ():boolean => {
        const newError: Record<string, string> = {};
        if(!formData.email.trim())
            newError.email = 'El correo es requerido';
        if(!formData.password.trim())
            newError.password = 'La contraseña es requerida';
        setError(newError);
        return Object.keys(newError).length === 0;
    }

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
            const response = await login(formData);
            localStorage.setItem('token', response.token);
            navigate('/activities',{replace:true});
        }catch (error){
            if (axios.isAxiosError(error) && error.response?.status === 401){
                setError({form: 'Correo o contraseña incorrectos'});
            } else {
                setError({form: 'Ocurrió un error, por favor intente nuevamente'});
            }
        }finally{
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
                {error.form && <div className="text-red-500 mb-4">{error.form}</div>}
                <form onSubmit={handleSubmit}>
                    <Input 
                        label="Correo"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={error.email}
                    />
                    <Input 
                        label="Contraseña"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={error.password}
                    />
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? 'Cargando...' : 'Iniciar Sesión'}
                    </Button>
                </form>
                <p className="mt-4 text-center">
                    ¿No tienes una cuenta? <Link to="/register" className="text-blue-600 hover:underline">Regístrate</Link>
                </p>
            </div>
        </div>
    );

}