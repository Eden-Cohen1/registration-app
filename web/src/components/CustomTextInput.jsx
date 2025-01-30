function CustomTextInput({ label, value, onChange, type = 'text' }){
    const isPass = type === "password" 
    const icon = isPass ? "/lock.svg" : "/email.svg"
    return (
        <>
        <div className="mb-4 flex gap-3 items-center relative">
            <img src={icon} className="absolute ml-2" />
            { isPass && <img src="/view.svg" className="absolute right-3 cursor-pointer" /> }
            <input
              type={type}
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