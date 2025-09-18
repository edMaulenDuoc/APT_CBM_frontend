import { useState } from "react";

const Switch = ({ label = "Usuario activo", defaultChecked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onChange) onChange(newValue); 
  };

  return (
    <div className="flex items-center gap-2">
        <button
            type="button"
            onClick={handleToggle}
            className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
            isChecked ? "bg-red-500" : "bg-gray-300"
            }`}>

            <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                isChecked ? "translate-x-4" : "translate-x-0"
                }`}
            />
        </button>
        <span className="text-sm text-white">{label}</span>
    </div>
  );
};

export default Switch;
