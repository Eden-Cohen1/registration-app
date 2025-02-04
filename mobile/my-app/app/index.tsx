import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import logo from "../assets/images/logo.png";
import google from "../assets/images/google.png";
import facebook from "../assets/images/facebook.png";
import "../global.css";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { SplashScreen } from "expo-router";
import suite from "../validations/suite";
import CustomTextInput from "./components/CustomTextInput";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [fontsLoaded, error] = useFonts({
    "Lato-Regular": require("../assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("../assets/fonts/Lato-Bold.ttf"),
    "Lato-Black": require("../assets/fonts/Lato-Black.ttf"),
    "Lato-Light": require("../assets/fonts/Lato-Light.ttf"),
    "Lato-Thin": require("../assets/fonts/Lato-Thin.ttf"),
  });
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [validationResult, setValidationResult] = useState(suite.get());

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  const handleFieldChange = (field: string, value: string) => {
    const newState = { ...formState, [field]: value };
    setFormState(newState);
    // Run validation for the current field
    const res = suite(newState, field).done(setValidationResult);
  };

  const handleLogin = async () => {
    try {
      const loginRes = await fetch(
        "https://registration-assignment.azurewebsites.net/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.email,
            password: formState.password,
          }),
        }
      );
      if (!loginRes.ok) {
        throw new Error(`Server responded with ${loginRes.status}`);
      }
      const loginData = await loginRes.json();
      console.log("Server response:", loginData);
    } catch (error) {
      console.error("Login error:", error);
    }

    try {
      // Replace localhost with your machine's IP or use a tunnel service if needed
      const textRes = await fetch("http://172.20.10.4:3001/random-text");
      if (!textRes.ok) {
        throw new Error(`Server error: ${textRes.status}`);
      }
      const textData = await textRes.json();
      Toast.show({
        type: "success",
        text1: `Random text: ${textData.text}`,
        position: "top",
      });
    } catch (error) {
      console.error("Error:", error);
      Toast.show({
        type: "error",
        text1: "Something went wrong while logging in or fetching random text.",
        position: "top",
      });
    }
  };

  return (
    <View className="flex flex-col justify-top items-center pt-20 px-16 h-full bg-white">
      <Image className="mb-10" source={logo} />
      <Text className="font-latoBold color-primary text-2xl mb-12">Log in</Text>
      <CustomTextInput
        type="email"
        label="Email"
        value={formState.email}
        onChange={(value: string) => handleFieldChange("email", value)}
        errors={validationResult.getErrors("email")}
        warnings={validationResult.getWarnings("email")}
      />
      <CustomTextInput
        type="password"
        label="Password"
        value={formState.password}
        onChange={(value: string) => handleFieldChange("password", value)}
        errors={validationResult.getErrors("password")}
        warnings={validationResult.getWarnings("password")}
      />
      <TouchableOpacity className="self-end">
        <Text className="text-primary text-sm font-semibold top-[-2px]">
          Forgot password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogin}
        disabled={!validationResult.isValid()}
        className={`bg-primary rounded-3xl py-2 w-full mt-8 ${
          !validationResult.isValid() ? "opacity-50" : ""
        }`}
      >
        <Text className="text-white py-1 text-center text-sm font-medium">
          Log in
        </Text>
      </TouchableOpacity>

      <View className="flex-row items-center justify-center my-2 w-3/5 mx-auto">
        <View className="flex-1 h-px bg-gray-200" />
        <Text className="mx-2 text-gray-400 text-sm font-semibold">Or</Text>
        <View className="flex-1 h-px bg-gray-200" />
      </View>

      <View className="flex-row justify-center items-center space-x-3 gap-3">
        <TouchableOpacity
          className="bg-white flex-row justify-center items-center border border-primary py-3 px-4 rounded-3xl w-1/2"
          disabled={false}
        >
          <Image source={google} className="w-5 h-5 mr-2" />
          <Text className="text-primary text-sm font-medium">Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white flex-row justify-center items-center border border-primary py-3 px-4 rounded-3xl w-1/2"
          disabled={false}
        >
          <Image source={facebook} className="w-5 h-5 mr-2" />
          <Text className="text-primary text-sm font-medium">Facebook</Text>
        </TouchableOpacity>
      </View>

      <Text className="font-bold text-sm text-gray-400 mt-6 text-center">
        Have no account yet?
      </Text>
      <TouchableOpacity className="border border-primary rounded-3xl py-2 w-full mt-4">
        <Text className="text-primary py-1 text-center text-sm font-medium">
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}
