import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import lock from "../../assets/images/lock.png";
import email from "../../assets/images/email.png";
import view from "../../assets/images/view.png";
import { useState, React } from "react";

const CustomTextInput = ({
  type,
  label,
  value,
  onChange,
  errors,
  warnings,
}) => {
  const isPass = type === "password";
  const [showPassword, setShowPassword] = useState(isPass);
  const icon = isPass ? lock : email;
  return (
    <View className="space-y-2 w-full">
      <View className="w-full flex justify-center h-12 text-xs border-[1px] border-gray-300 rounded-lg mb-5">
        <Image className="absolute ml-2" source={icon} />
        {isPass && (
          <TouchableOpacity
            className="absolute right-3 z-20"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image source={view} />
          </TouchableOpacity>
        )}
        <TextInput
          secureTextEntry={showPassword}
          onChangeText={onChange}
          placeholder={label}
          placeholderTextColor="gray"
          value={value}
          className="font-lato ml-10 w-full h-12 outline-none focus:ring-2 ring-offset-[1px] ring-offset-primary  focus:shadow-blue-200/50"
        />
      </View>
      {(errors.length > 0 || warnings.length > 0) && (
        <View className="absolute bottom-1 left-1">
          {errors.map((error, i) => (
            <Text key={i} className="text-red-500 text-[10px]">
              {error}
            </Text>
          ))}
          {warnings.map((warning, i) => (
            <Text key={i} className="text-yellow-600 text-[10px]">
              {warning}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default CustomTextInput;
