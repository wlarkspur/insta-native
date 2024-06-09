import React, { useRef } from "react";
import styled from "styled-components/native";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { AuthTextInput } from "../components/auth/AuthShared";

export default function CreateAccount() {
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
  return (
    <AuthLayout>
      <AuthTextInput
        autoFocus
        placeholder="First Name"
        placeholderTextColor="rgba(255,255,255,0.6)"
        returnKeyType="next"
        onSubmitEditing={() => onNext(lastNameRef)}
      />
      <AuthTextInput
        ref={lastNameRef}
        placeholder="Last Name"
        placeholderTextColor="rgba(255,255,255,0.6)"
        returnKeyType="done"
        onSubmitEditing={() => onNext(usernameRef)}
      />
      <AuthTextInput
        ref={usernameRef}
        placeholder="Username"
        placeholderTextColor="rgba(255,255,255,0.6)"
        returnKeyType="done"
        onSubmitEditing={() => onNext(emailRef)}
      />
      <AuthTextInput
        ref={emailRef}
        placeholder="Email"
        placeholderTextColor="rgba(255,255,255,0.6)"
        keyboardType="email-address"
        onSubmitEditing={() => onNext(passwordRef)}
      />
      <AuthTextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor="rgba(255,255,255,0.6)"
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={onDone}
        lastOne={true}
      />
      <AuthButton text="Create Account" disabled={true} onPress={() => null} />
    </AuthLayout>
  );
}
