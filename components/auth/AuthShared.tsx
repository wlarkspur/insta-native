import { styled } from "styled-components/native";
import { TextInput } from "react-native";

interface TextInputProps {
  lastOne?: boolean;
}

export const AuthTextInput = styled(TextInput)<TextInputProps>`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 15px 7px;
  border-radius: 4px;
  color: white;
  margin-bottom: ${(props) => (props.lastOne ? 15 : 8)}px;
`;
