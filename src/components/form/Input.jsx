const Input = ({type, name, placeholder = "", value, onChange, label = null}) => {
    return (
       <div className="flex flex-col">
           {label && <label htmlFor={name} className="mb-1 text-white">{label}</label> }
           <input 
               id={name}
               onChange={onChange}
               value={value}
               name={name}
               className="bg-gray-800 rounded-md border p-2 w-full h-9" 
               placeholder={placeholder} 
               type={type} />
       </div>
    );
}

export default Input;