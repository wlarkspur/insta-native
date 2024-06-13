import React, { useRef, useEffect } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { useForm } from "react-hook-form";
import { AuthTextInput } from "../components/auth/AuthShared";
import { gql, useMutation } from "@apollo/client";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export default function CreateAccount({ navigation }: any) {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const onCompleted = (data: any) => {
    const {
      createAccount: { ok },
    } = data;
    const { username, password } = getValues();
    if (ok) {
      navigation?.navigate("LogIn", {
        username,
        password,
      });
    }
  };
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

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
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
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
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text) => setValue("lastName", text)}
      />

      <AuthTextInput
        ref={emailRef}
        placeholder="Email"
        placeholderTextColor="rgba(255,255,255,0.6)"
        keyboardType="email-address"
        onSubmitEditing={() => onNext(usernameRef)}
        onChangeText={(text) => setValue("email", text)}
      />
      <AuthTextInput
        ref={usernameRef}
        placeholder="Username"
        placeholderTextColor="rgba(255,255,255,0.6)"
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
