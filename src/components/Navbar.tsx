import {Link, useNavigate} from "react-router-dom";

export default function Navbar(){
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login',{replace:true});
    };
    return (
        <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <Link to="/activities" className = "text-xl font-bold">Campus Cultura</Link>
            <button onClick={handleLogout} className = "bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">Cerrar Sesión</button>
        </nav>
    );
}
