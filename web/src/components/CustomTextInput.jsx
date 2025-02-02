import { useState } from "react";

function CustomTextInput({
  label,
  value,
  onChange,
  type = "text",
  errors = [],
  warnings = [],
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPass = type === "password";
  const icon = isPass ? "/lock.svg" : "/email.svg";
  const inputType = isPass ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-4 flex gap-3 items-center relative">
      <img src={icon} className="absolute ml-2" />
      {isPass && (
        <button
          type="button"
          className="absolute right-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          <img src="/view.svg" />
        </button>
      )}
      <input
        type={inputType}
        className="w-full pl-10 py-2 text-xs border-[1px] border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-offset ring-offset-[1px] ring-offset-primary focus:shadow-4xl focus:shadow-blue-200/50 transition"
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {(errors.length > 0 || warnings.length > 0) && (
        <div className="absolute -bottom-4 left-1 text-xs">
          {errors.map((error, i) => (
            <div key={i} className="text-red-500 text-[0.6rem]">
              {error}
            </div>
          ))}
          {warnings.map((warning, i) => (
            <div key={i} className="text-yellow-600">
              {warning}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomTextInput;
