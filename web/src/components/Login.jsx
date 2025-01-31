import CustomTextInput from "./CustomTextInput"
import { useState } from "react";
import { toast } from "react-toastify";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const res = await fetch("registrationapp-gddsf8hjebaea6d6.israelcentral-01.azurewebsites.net/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                  })
            })
            if(!res.ok){
                throw new Error(`Server responded with ${response.status}`);

            }
            const data = await response.json();
            console.log("Server response:", data);
            
        }catch(error){
            console.error("Login error:", error);
        }

        try{
            const res = await fetch('http://localhost:3001/random-text');
            if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
            }
            const data = await res.json();

            
            toast.success(`Random text: ${data.text}`, {
                position: "top-center"
            });
    } catch (error) {
        console.error('Error:', error);
        toast.error("Something went wrong while logging in or fetching random text.");
    }
      };

    return(
        <>
        <div className="main-box flex m-auto w-[80%] max-w-[1100px] h-[38rem] bg-white rounded-2xl">
            <img src='/logo.svg' className=" w-[2.5rem] absolute mt-10 ml-10 z-1"/>
            <div className="left w-[60%] flex flex-col bg-primary h-full items-center justify-center rounded-l-2xl">
                <div className="relative flex justify-center">
                    <div className="absolute mr-4 mt-4 w-[14rem] h-[14rem] rounded-full bg-primaryVar z-0"></div>
                    <img src='/pcImage.png' className="w-[80%] z-10"/>
                </div>
                <div className="text-center text-white ">
                    <h1 className="font-medium text-[20px]">Welcome aboard my friend</h1>
                    <h2 className="font-light text-[12px]">just a couple of clicks and we start</h2>
                </div>
            </div>
            <div className="right w-[40%] rounded-r-2xl flex flex-col items-center justify-center px-12">
                <h1 className="text-primary font-semibold mb-14">Log in</h1>
                <form className="w-full" onSubmit={handleLogin}>
                <div className="flex flex-col gap-0">
                <CustomTextInput
                    type="email"
                    label="Email"
                    value={email}
                    onChange={setEmail}
                />
                <CustomTextInput
                    type="password"
                    label="Password"
                    value={password}
                    onChange={setPassword}
                />
                <a className="text-link text-xs font-semibold w-fit ml-auto hover:text-primary">Forgot password?</a>

                </div>

                <button type='submit' className="bg-primary text-white rounded-3xl py-2 text-xs w-full mt-8 hover:bg-btnHover">Log in</button>
                </form>
                <div className="flex items-center justify-center m-auto my-2 w-[60%]">
                    <div className="flex-grow h-px bg-gray-200" />
                    <span className="mx-2 text-gray-400 text-xs font-semibold">Or</span>
                    <div className="flex-grow h-px bg-gray-200" />
                </div>
                <div className="flex justify-center items-center gap-3">
                    <button className="bg-white flex gap-2 border-solid border-primary border-[1px] py-2 pr-10 pl-6 rounded-3xl text-xs items-center w-[50%] text-primary hover:bg-btnSocialHover"><img src='Google.svg'/>Google</button>
                    <button className="bg-white flex gap-2 border-solid border-primary border-[1px] py-2 pr-10 pl-6 rounded-3xl text-xs items-center w-[50%] text-primary hover:bg-btnSocialHover"><img src='Facebook.svg'/>Facebook</button>
                </div>
                <h2 className="font-semibold text-xs text-gray-400 mt-6">Have no account yet?</h2>
                <button className="text-primary rounded-3xl py-2 text-xs w-full mt-4 border-solid border-primary border-[1px]">Register</button>

            </div>
        </div>
        </>
    )
}

export default Login