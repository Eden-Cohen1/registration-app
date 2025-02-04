import CustomTextInput from "./CustomTextInput";
import { useState } from "react";
import { toast } from "react-toastify";
import suite from "../validations/suite";

function Login() {
  // State to store form input values
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  // State to store validation results
  const [validationResult, setValidationResult] = useState(suite.get());

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    try {
      // Send login request to backend
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formState.email,
          password: formState.password,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      console.log("Server response:", data);
    } catch (error) {
      console.error("Login error:", error);
    }

    try {
      // Fetch random text from backend
      const res = await fetch("http://localhost:3001/random-text");

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      // Show success toast with random text
      toast.success(`Random text: ${data.text}`, {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "Something went wrong while logging in or fetching random text."
      );
    }
  };

  const handleFieldChange = (field, value) => {
    // Update form state when user types
    const newState = { ...formState, [field]: value };
    setFormState(newState);

    // Run validation for the current field
    suite(newState, field).done(setValidationResult);
  };

  return (
    <>
      <div className="main-box relative flex m-auto w-[80%] max-w-[1100px] h-[38rem] bg-white rounded-2xl">
        {/* Logo (hidden on small screens) */}
        <img
          src="/logo.svg"
          className="hidden md:flex w-[2.5rem] absolute mt-10 ml-10 z-1"
        />

        {/* Left Side - Welcome Message (Visible on larger screens) */}
        <div className="left w-[60%] hidden md:flex flex-col bg-primary h-full items-center justify-center rounded-l-2xl">
          <div className="relative flex justify-center">
            <div className="absolute mr-4 mt-4 w-[14rem] h-[14rem] rounded-full bg-primaryVar z-0"></div>
            <img src="/pcImage.png" className="w-[80%] z-10" />
          </div>
          <div className="text-center text-white">
            <h1 className="font-medium text-[20px]">
              Welcome aboard my friend
            </h1>
            <h2 className="font-light text-[12px]">
              Just a couple of clicks and we start
            </h2>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="right m-auto max-w-[28rem] md:w-[40%] w-full sm:px-20 px-10 rounded-r-2xl flex flex-col items-center justify-center md:px-12">
          {/* Mobile Logo */}
          <img
            src="/logo_mobile.svg"
            className="md:hidden flex w-[2.5rem] mb-6"
          />
          <h1 className="text-primary font-semibold mb-14">Log in</h1>

          {/* Login Form */}
          <form
            className="w-full relative flex flex-col"
            onSubmit={handleLogin}
          >
            {/* Email Input */}
            <CustomTextInput
              type="email"
              label="Email"
              value={formState.email}
              onChange={(value) => handleFieldChange("email", value)}
              errors={validationResult.getErrors("email")}
              warnings={validationResult.getWarnings("email")}
            />

            {/* Password Input */}
            <CustomTextInput
              type="password"
              label="Password"
              value={formState.password}
              onChange={(value) => handleFieldChange("password", value)}
              className="password"
              errors={validationResult.getErrors("password")}
              warnings={validationResult.getWarnings("password")}
            />

            {/* Forgot Password Link */}
            <button
              type="button"
              className="text-link text-xs font-semibold w-fit ml-auto hover:text-primary disabled:opacity-50"
            >
              Forgot password?
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-primary text-white rounded-3xl py-2 text-xs w-full mt-8 hover:bg-btnHove disabled:opacity-50"
              disabled={!validationResult.isValid()}
            >
              Log in
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center justify-center m-auto my-2 w-[60%]">
            <div className="flex-grow h-px bg-gray-200" />
            <span className="mx-2 text-gray-400 text-xs font-semibold">Or</span>
            <div className="flex-grow h-px bg-gray-200" />
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center items-center gap-3">
            <button className="bg-white flex gap-2 border-solid border-primary border-[1px] py-2 pr-10 pl-6 rounded-3xl text-xs items-center w-[50%] text-primary hover:bg-btnSocialHover disabled:opacity-50">
              <img src="Google.svg" />
              Google
            </button>
            <button className="bg-white flex gap-2 border-solid border-primary border-[1px] py-2 pr-10 pl-6 rounded-3xl text-xs items-center w-[50%] text-primary hover:bg-btnSocialHover disabled:opacity-50">
              <img src="Facebook.svg" />
              Facebook
            </button>
          </div>

          {/* Register Link */}
          <h2 className="font-semibold text-xs text-gray-400 mt-6">
            Have no account yet?
          </h2>
          <button className="text-primary rounded-3xl py-2 text-xs w-full mt-4 border-solid border-primary border-[1px] hover:bg-btnSocialHover disabled:opacity-50">
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
