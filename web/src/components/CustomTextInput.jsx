import { useState } from "react";

function CustomTextInput({ label, value, onChange, type = 'text' }){
    const [showPassword, setShowPassword] = useState(false)
    const isPass = type === "password" 
    const icon = isPass ? "/lock.svg" : "/email.svg"
    const inputType = isPass ? (showPassword ? 'text' : 'password') : type;

    return (
        <>
        <div className="mb-4 flex gap-3 items-center relative">
            <img src={icon} className="absolute ml-2" />
            { isPass && 
            <button
              type="button" 
              className="absolute right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}>

            <img src="/view.svg" className="" /> 
            </button>}
            <input
              type={inputType}
              className="w-full
                        pl-10 py-2
                        text-xs
                        border-[1px] border-gray-300 
                        rounded-lg
                        outline-none
                        focus:ring-2 focus:ring-offset
                        ring-offset-[1px]
                        ring-offset-primary
                        focus:shadow-4xl focus:shadow-blue-200/50
                        transition"
              placeholder={label}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        </>
    )
}

export default CustomTextInput