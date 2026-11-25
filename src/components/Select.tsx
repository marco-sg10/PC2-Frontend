import type { SelectHTMLAttributes } from "react";
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string;
}

export function Select({label,error,children, ...props}:SelectProps){
    return (
        <div className = "mb-4">
            <label className = "block font-medium">
                {label}
                <select {...props} className = "w-full border rounded p-2 mt-1">
                    {children}
                </select>
            </label>
            {error && <p className = "text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}