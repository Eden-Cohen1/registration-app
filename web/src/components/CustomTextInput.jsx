import { useState } from "react";

function CustomTextInput({
  label,
  value,
  onChange,
  type = "text",
  errors = [],
  warnings = [],
}) {
  // State to manage visibility for password fields
  const [showPassword, setShowPassword] = useState(false);

  // Determine if the input is a password field
  const isPass = type === "password";

  // Choose the appropriate icon based on the input type
  const icon = isPass ? "/lock.svg" : "/email.svg";

  // Set input type: show text if password is visible, otherwise hide it
  const inputType = isPass ? (showPassword ? "text" : "password") : type;

  return (
    <div className="mb-4 flex gap-3 items-center relative">
      {/* Display input icon */}
      <img src={icon} className="absolute ml-2" />

      {/* If password field, show toggle button */}
      {isPass && (
        <button
          type="button"
          className="absolute right-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          <img src="/view.svg" />
        </button>
      )}

      {/* Input field */}
      <input
        type={inputType}
        className="w-full pl-10 py-2 text-xs border-[1px] border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-offset ring-offset-[1px] ring-offset-primary focus:shadow-4xl focus:shadow-blue-200/50 transition"
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* Display errors and warnings if any */}
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
