import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 0px 40px;
`;

const Logo = styled.Image`
  max-width: 61%;
  height: 114px;
`;

export default function AuthLayout({ children }: any) {
  return (
    <Container>
      <Logo
        resizeMode="contain"
        source={require("../../assets/Instagram-blackwhite.png")}
      />
      {children}
    </Container>
  );
}
