import React, { useRef, useEffect } from "react";
import styled from "styled-components/native";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { useForm } from "react-hook-form";
import { AuthTextInput } from "../components/auth/AuthShared";

export default function CreateAccount() {
  const { register, handleSubmit, setValue } = useForm();
  const lastNameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const onNext = (nextOne: any) => {
    nextOne?.current?.focus();
  };
  const onDone = () => {
    alert("Done");
  };
  const onValid = (data: any) => {
    console.log(data);
  };
  useEffect(() => {
    register("firstName", { required: true });
    register("lastName", { required: true });
    register("email", { required: true });
    register("username", { required: true });
    register("password", { required: true });
  }, [register]);
  return (
    <AuthLayout>
      <AuthTextInput
        autoFocus
        placeholder="First Name"
        autoCapitalize="none"
        placeholderTextColor="rgba(255,255,255,0.6)"
        returnKeyType="next"
        onSubmitEditing={() => onNext(lastNameRef)}
        onChangeText={(text) => setValue("firstName", text)}
      />
      <AuthTextInput
        ref={lastNameRef}
        placeholder="Last Name"
        placeholderTextColor="rgba(255,255,255,0.6)"
        returnKeyType="done"
        onSubmitEditing={() => onNext(usernameRef)}
        onChangeText={(text) => setValue("lastName", text)}
      />

      <AuthTextInput
        ref={emailRef}
        placeholder="Email"
        placeholderTextColor="rgba(255,255,255,0.6)"
        keyboardType="email-address"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("email", text)}
      />
      <AuthTextInput
        ref={usernameRef}
        placeholder="Username"
        placeholderTextColor="rgba(255,255,255,0.6)"
        returnKeyType="done"
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <AuthTextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor="rgba(255,255,255,0.6)"
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
        lastOne={true}
      />
      <AuthButton
        disabled={false}
        text="Create Account"
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
