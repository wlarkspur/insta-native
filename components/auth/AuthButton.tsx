import styled from "styled-components/native";
import { colors } from "../../colors";

const Button = styled.TouchableOpacity`
  background-color: ${colors.blue};
  padding: 13px 10px;
  border-radius: 5px;
  margin-top: 20px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
`;

interface IAuthButton {
  onPress: () => void;
  disabled: boolean;
  text: string;
}

export default function AuthButton({ onPress, disabled, text }: IAuthButton) {
  return (
    <Button disabled={disabled} onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </Button>
  );
}
