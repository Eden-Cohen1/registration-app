import { Stack } from "expo-router";
import "../global.css";
import Toast from "react-native-toast-message";
import React from "react";

export default function RootLayout() {
  return (
    <>
      <Stack />
      <Toast />
    </>
  );
}
