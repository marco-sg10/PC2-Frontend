import type { InputHTMLAttributes } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export function Input({label,error,...props}:InputProps){
    return (
        <div className = "mb-4">
            <label className = "block font-medium">
                {label}
                <input {...props} className = "w-full border rounded p-2 mt-1"/>
            </label>
            {error && <p className = "text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}

