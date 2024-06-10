import React, { useRef, useEffect } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import { AuthTextInput } from "../components/auth/AuthShared";
import AuthButton from "../components/auth/AuthButton";
import { useForm } from "react-hook-form";

export default function LogIn() {
  const { register, handleSubmit, setValue } = useForm();
  const passwordRef = useRef(null);
  const onNext = (nextOne: any) => {
    nextOne?.current?.focus();
  };
  const onValid = (data: any) => {
    console.log(data);
  };
  useEffect(() => {
    register("username");
    register("password");
  }, [register]);
  return (
    <AuthLayout>
      <AuthTextInput
        placeholder="Username"
        placeholderTextColor="rgba(255,255,255,0.6)"
        autoCapitalize="none"
        returnKeyType="done"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <AuthTextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor="rgba(255,255,255,0.6)"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="Log In"
        disabled={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
